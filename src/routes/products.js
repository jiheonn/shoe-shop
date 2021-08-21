import express from 'express'
import formater from '../filter/format'
import db_querys from '../db/querys'

const router = express.Router()

/* /products */
router.get('/', async (req, res) => {
  const username = req.user ? req.user.u_name : ''

  const rows = await db_querys.selectProductList()
  const productList = formater.productInfoFormat(rows)

  res.render('products', { username, productList })
})

router.get('/:p_id', async (req, res) => {
  const username = req.user ? req.user.u_name : ''

  const { p_id } = req.params

  const rows = await db_querys.selectProductInfo(p_id)
  const productInfo = formater.productInfoFormat(rows)

  const productColors = await db_querys.selectProductColors(p_id)

  const productReview = await db_querys.selectProductReview(p_id)
  const review_count = productReview.length

  res.render('product-detail', {
    username,
    productInfo,
    productColors,
    productReview,
    review_count,
  })
})

router.get('/:p_id/size', async (req, res) => {
  const { p_id } = req.params
  const { p_color } = req.query

  const productSizes = await db_querys.selectProductSize(p_id, p_color)
  res.send(productSizes)
})

export default router
