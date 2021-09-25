import * as express from 'express'

import formater from '../format/formater'
import db_querys from '../db/querys'

// TODO: types 분리 필요
declare module 'express' {
  export interface Request {
    user: any
  }
}

const getProducts = async (req: express.Request, res: express.Response) => {
  const username = req.user ? req.user.u_name : ''

  const rows = await db_querys.selectProductList()
  const productList = formater.productInfoFormat(rows)

  const brandList = await db_querys.selectBrandList()
  const categoryList = await db_querys.selectcategoryList()

  res.render('products', { username, productList, brandList, categoryList })
}
const getSortedProducts = async (
  req: express.Request,
  res: express.Response,
) => {
  const { sort_type } = req.query

  let rows

  if (sort_type === 'popular') {
    rows = await db_querys.productOrderbyPopular()
  } else if (sort_type === 'review') {
    rows = await db_querys.productOrderbyReview()
  } else if (sort_type === 'name') {
    rows = await db_querys.productOrderbyName()
  } else {
    rows = await db_querys.selectProductList()
  }

  res.send({
    sortedProductList: formater.productInfoFormat(rows),
  })
}
const getFilteredProducts = async (
  req: express.Request,
  res: express.Response,
) => {
  const { brand, category, p_type } = req.query

  const rows = await db_querys.productFilter(brand, category, p_type)

  res.send({
    filteredProductList: formater.productInfoFormat(rows),
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
  const productInfo = formater.productInfoFormat(rows)

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
