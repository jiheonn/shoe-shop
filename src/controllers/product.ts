import * as express from 'express'
import * as sequelize from 'sequelize'
import * as moment from 'moment'
import 'moment-timezone'

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
import { formatProductInfo, formatDate } from '../format'

// TODO: types 분리 필요
declare module 'express' {
  export interface Request {
    user: any
  }
}

moment.tz.setDefault('Asia/Seoul')

const getProducts = async (req: express.Request, res: express.Response) => {
  if (Object.keys(req.query).length === 0) {
    const products = await Product.findAndCountAll({
      raw: true,
      limit: 6,
    })

    const brands = await Brand.findAll({ raw: true })
    const categories = await Category.findAll({ raw: true })

    res.render('product', {
      products: formatProductInfo(products.rows),
      page: Math.ceil(products.count / 6),
      username: req.user ? req.user.name : '',
      brands,
      categories,
    })
  } else {
    const { sort, brand, category, type, page } = req.query

    // @ts-ignore
    const pageNumber = Number.parseInt(page, 10)
    const limit = 6
    const offset = pageNumber > 1 ? limit * (pageNumber - 1) : 0

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
      products = await Product.findAndCountAll({
        where: filterOptions,
        order: [['registrationDate', 'DESC']],
        offset,
        limit,
        raw: true,
      })
    } else if (sort === 'popularity') {
      products = await Product.findAndCountAll({
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
        offset,
        limit,
        raw: true,
        subQuery: false,
      })
    } else if (sort === 'review') {
      products = await Product.findAndCountAll({
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
        offset,
        limit,
        raw: true,
        subQuery: false,
      })
    } else if (sort === 'name') {
      products = await Product.findAndCountAll({
        where: filterOptions,
        order: [['name', 'ASC']],
        offset,
        limit,
        raw: true,
      })
    } else {
      products = await Product.findAndCountAll({
        where: filterOptions,
        offset,
        limit,
        raw: true,
      })
    }

    res.send({
      products: formatProductInfo(products.rows),
      page:
        sort === 'popularity' || sort === 'review'
          ? Math.ceil(products.count.length / 6)
          : Math.ceil(products.count / 6),
    })
  }
}

const getSearchedProducts = async (
  req: express.Request,
  res: express.Response,
) => {
  const { keyword, brand, category, type } = req.query

  const filterOptions = {}

  if (brand !== 'all') {
    Object.assign(filterOptions, { brandId: brand })
  }
  if (category !== 'all') {
    Object.assign(filterOptions, { categoryId: category })
  }
  if (type !== 'all') {
    Object.assign(filterOptions, { type })
  }

  const products = await Product.findAndCountAll({
    where: {
      ...filterOptions,
      [sequelize.Op.or]: [
        {
          code: {
            [sequelize.Op.like]: `%${keyword}%`,
          },
        },
        {
          name: {
            [sequelize.Op.like]: `%${keyword}%`,
          },
        },
        {
          description: {
            [sequelize.Op.like]: `%${keyword}%`,
          },
        },
      ],
    },
    raw: true,
  })

  const brands = await Brand.findAll({ raw: true })
  const categories = await Category.findAll({ raw: true })

  res.render('product-search', {
    products: formatProductInfo(products.rows),
    totalNumberOfProducts: products.count,
    username: req.user ? req.user.name : '',
    brands,
    categories,
  })
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

  product.reviews = product.reviews.map(_review => {
    const review = _review

    review.createdDate = formatDate(review.createdDate)

    return review
  })

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

  const brands = await Brand.findAll({ raw: true })
  const categories = await Category.findAll({ raw: true })

  res.render('product-detail', {
    product: formatProductInfo(product),
    username: user.name,
    user,
    productId,
    brands,
    categories,
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

const createReview = async (req: express.Request, res: express.Response) => {
  const productId = req.params.id
  const { userId, content } = req.body

  // await db_querys.insertProductReview(p_id, u_id, r_contents)

  await Review.create({
    userId,
    productId,
    content,
    createdDate: moment(),
  })

  res.redirect(`/products/${productId}`)
}

const updateReview = async (req: express.Request, res: express.Response) => {
  const { id, content } = req.body

  await Review.update(
    {
      content,
      createdDate: moment(),
    },
    {
      where: {
        id,
      },
    },
  )

  res.send({ status: 'success' })
}

const deleteReview = async (req: express.Request, res: express.Response) => {
  const { id } = req.body

  await Review.destroy({
    where: {
      id,
    },
  })

  res.send({ status: 'success' })
}

export default {
  getProducts,
  getSearchedProducts,
  getProductDetails,
  getProductSizes,
  updateLike,
  createReview,
  updateReview,
  deleteReview,
}
