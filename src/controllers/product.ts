import * as express from 'express'
import * as sequelize from 'sequelize'

import {
  Product,
  Brand,
  Category,
  OrderDetail,
  Review,
  ProductDetail,
  Like,
  User,
} from '../db/models'
import { formatProductInfo } from '../format'
import db_querys from '../db/querys'

// TODO: types 분리 필요
declare module 'express' {
  export interface Request {
    user: any
  }
}

const getProducts = async (req: express.Request, res: express.Response) => {
  if (Object.keys(req.query).length === 0) {
    const products = await Product.findAll({
      raw: true,
    })

    const brands = await Brand.findAll({ raw: true })
    const categories = await Category.findAll({ raw: true })

    res.render('products', {
      products: formatProductInfo(products),
      username: req.user ? req.user.name : '',
      brands,
      categories,
    })
  } else {
    const { sort, brand, category, type } = req.query

    const optionDefault = ['브랜드', '카테고리', '상품타입', '전체상품']

    const filterOptions = {}

    // @ts-ignore
    if (!optionDefault.includes(brand)) {
      Object.assign(filterOptions, { brandId: brand })
    }
    // @ts-ignore
    if (!optionDefault.includes(category)) {
      Object.assign(filterOptions, { categoryId: category })
    }
    // @ts-ignore
    if (!optionDefault.includes(type)) {
      Object.assign(filterOptions, { type })
    }

    let products

    if (sort === 'registration') {
      products = await Product.findAll({
        where: filterOptions,
        order: [['registrationDate', 'DESC']],
        raw: true,
      })
    } else if (sort === 'popularity') {
      products = await Product.findAll({
        attributes: {
          include: [
            [
              sequelize.fn('SUM', sequelize.col('orderDetails.quantity')),
              'totalNumberOrders',
            ],
          ],
        },
        include: [
          {
            model: OrderDetail,
            as: 'orderDetails',
            attributes: [],
          },
        ],
        where: filterOptions,
        group: ['Product.id'],
        order: sequelize.literal('totalNumberOrders DESC'),
        raw: true,
      })
    } else if (sort === 'review') {
      products = await Product.findAll({
        attributes: {
          include: [
            [
              sequelize.fn('COUNT', sequelize.col('reviews.products_id')),
              'totalNumberReviews',
            ],
          ],
        },
        include: [
          {
            model: Review,
            as: 'reviews',
            attributes: [],
          },
        ],
        where: filterOptions,
        group: ['Product.id'],
        order: sequelize.literal('totalNumberReviews DESC'),
        raw: true,
      })
    } else if (sort === 'name') {
      products = await Product.findAll({
        where: filterOptions,
        order: [['name', 'ASC']],
        raw: true,
      })
    } else {
      products = await Product.findAll({
        where: filterOptions,
        raw: true,
      })
    }
    res.send({
      products: formatProductInfo(products),
    })
  }
}

const getProductDetails = async (
  req: express.Request,
  res: express.Response,
) => {
  const productId = req.params.id

  /*
    Reference: https://github.com/sequelize/sequelize/issues/5193

    현재 product_details Table에 primary key (id) 가 없으므로
    include dataValues 가 오직 1개만 반환되는 이슈가 발생

    1. primary key (id) 를 추가하면 해결된다고 함
      -> 의미없는 primary key 를 추가하고 싶지 않음
    2. { plain: false, raw: true } 추가
      -> 1:M 관계에서 1 에 해당되는 dataValues 중복

    추후 product_details Table의 color column 이 서로 다른 여러개의 값을 가지게 된다면
    2번 방법을 고려하여 M 에 해당되는 dataValues 추출하여 정리가 필요
   */
  let product = await Product.findOne({
    include: [
      {
        model: ProductDetail,
        as: 'productDetails',
        attributes: ['color'],
      },
      {
        model: Brand,
        as: 'brands',
        attributes: ['name'],
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['name'],
      },
      {
        model: Review,
        as: 'reviews',
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['email'],
          },
        ],
      },
      {
        model: Like,
        as: 'likes',
      },
    ],
    where: {
      id: productId,
    },
  })
  product = product.get({ plain: true })

  const user = {
    id: '',
    name: '',
    email: '',
    like: {},
  }

  if (req.user) {
    user.id = req.user.id
    user.name = req.user.name
    user.email = req.user.email
    user.like = (await Like.findOne({
      attributes: ['status'],
      where: {
        userId: user.id,
        productId,
      },
      raw: true,
    })) || { status: false }
  }

  console.log(user.like)

  const brands = await Brand.findAll({ raw: true })

  res.render('product-detail', {
    product: formatProductInfo(product),
    username: user.name,
    user,
    productId,
    brands,
  })
}

const getProductSizes = async (req: express.Request, res: express.Response) => {
  const productId = req.params.id
  const { color } = req.query

  const productSizes = await ProductDetail.findAll({
    attributes: ['size'],
    where: {
      productId,
      color,
    },
    raw: true,
  })

  res.send({ productSizes })
}

const updateLike = async (req: express.Request, res: express.Response) => {
  const productId = req.params.id
  const { userId, status } = req.body

  const like = await Like.findOne({
    where: {
      userId,
      productId,
    },
  })

  if (like) {
    await like.update({
      userId,
      productId,
      status,
    })
  } else {
    await Like.create({
      userId,
      productId,
      status,
    })
  }

  res.send({ status: 'success' })
}

const insertReview = async (req: express.Request, res: express.Response) => {
  const { p_id } = req.params
  const { u_id, r_contents } = req.body

  await db_querys.insertProductReview(p_id, u_id, r_contents)

  res.redirect(`/products/${p_id}`)
}

const updateReview = async (req: express.Request, res: express.Response) => {
  const { r_contents, r_id } = req.body

  await db_querys.updateProductReview(r_contents, r_id)

  res.send({ status: 'success' })
}

const deleteReview = async (req: express.Request, res: express.Response) => {
  const { r_id } = req.body

  await db_querys.deleteProductReview(r_id)

  res.send({ status: 'success' })
}

export default {
  getProducts,
  getProductDetails,
  getProductSizes,
  updateLike,
  insertReview,
  updateReview,
  deleteReview,
}
