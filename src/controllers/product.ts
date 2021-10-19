import * as express from 'express'
import * as sequelize from 'sequelize'

import { Product, Brand, Category, OrderDetail, Review } from '../db/models'
import { formatProductInfo } from '../format'
import db_querys from '../db/querys'

// TODO: types 분리 필요
declare module 'express' {
  export interface Request {
    user: any
  }
}

const getProducts = async (req: express.Request, res: express.Response) => {
  const username = req.user ? req.user.u_name : ''

  const products = await Product.findAll({
    raw: true,
  })

  const brands = await Brand.findAll({ raw: true })

  const categories = await Category.findAll({ raw: true })

  res.render('products', {
    username,
    products: formatProductInfo(products),
    brands,
    categories,
  })
}
const getSortedProducts = async (
  req: express.Request,
  res: express.Response,
) => {
  const { type } = req.query

  let sortedProducts

  if (type === 'regist') {
    sortedProducts = await Product.findAll({
      order: [['registrationDate', 'DESC']],
      raw: true,
    })
  } else if (type === 'popular') {
    sortedProducts = await Product.findAll({
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
      group: ['Product.id'],
      order: sequelize.literal('totalNumberOrders DESC'),
      raw: true,
    })
  } else if (type === 'review') {
    sortedProducts = await Product.findAll({
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
      group: ['Product.id'],
      order: sequelize.literal('totalNumberReviews DESC'),
      raw: true,
    })
  } else if (type === 'name') {
    sortedProducts = await Product.findAll({
      order: [['name', 'ASC']],
      raw: true,
    })
  } else {
    sortedProducts = await Product.findAll({
      raw: true,
    })
  }

  res.send({
    sortedProducts: formatProductInfo(sortedProducts),
  })
}
const getFilteredProducts = async (
  req: express.Request,
  res: express.Response,
) => {
  const { brand, category, type } = req.query

  console.log(brand, category, type)

  const optionDefault = ['브랜드', '카테고리', '상품타입', '전체상품']

  const filterOption = {}

  // @ts-ignore
  if (!optionDefault.includes(brand)) {
    Object.assign(filterOption, { brandId: brand })
  }
  // @ts-ignore
  if (!optionDefault.includes(category)) {
    Object.assign(filterOption, { categoryId: category })
  }
  // @ts-ignore
  if (!optionDefault.includes(type)) {
    Object.assign(filterOption, { type })
  }

  const filteredProducts = await Product.findAll({
    where: filterOption,
    raw: true,
  })

  res.send({
    filteredProducts: formatProductInfo(filteredProducts),
  })
}
const getProductDetails = async (
  req: express.Request,
  res: express.Response,
) => {
  const username = req.user ? req.user.u_name : ''

  const { p_id } = req.params

  const brandList = await db_querys.selectBrandList()

  const rows = await db_querys.selectProductInfo(p_id)
  const productInfo = formatProductInfo(rows)

  const productColors = await db_querys.selectProductColors(p_id)

  const productReview = await db_querys.selectProductReview(p_id)
  // TODO: productReview type
  // @ts-ignore
  const review_count = productReview.length

  const productLike = await db_querys.selectProductLike(p_id)

  let productUserLike = {}
  let u_id = ''
  if (req.user) {
    u_id = req.user.u_id
    productUserLike = await db_querys.selectProductUserLike(p_id, u_id)
  }

  res.render('product-detail', {
    u_id,
    p_id,
    username,
    brandList,
    productInfo,
    productColors,
    productReview,
    review_count,
    productLike,
    productUserLike,
  })
}
const getProductSizes = async (req: express.Request, res: express.Response) => {
  const { p_id } = req.params
  const { p_color } = req.query

  const productSizes = await db_querys.selectProductSize(p_id, p_color)
  res.send(productSizes)
}
const updateLike = async (req: express.Request, res: express.Response) => {
  const { p_id } = req.params
  const { u_id, like_status } = req.body

  if (like_status === 'false') {
    await db_querys.insertProductLike(p_id, u_id)

    await db_querys.updateProductLikeOn(p_id, u_id)
  } else {
    await db_querys.updateProductLikeOff(p_id, u_id)
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
  getSortedProducts,
  getFilteredProducts,
  getProductDetails,
  getProductSizes,
  updateLike,
  insertReview,
  updateReview,
  deleteReview,
}
