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
    productInfo,
    productColors,
    productReview,
    review_count,
    productLike,
    productUserLike,
  })
})

router.get('/:p_id/size', async (req, res) => {
  const { p_id } = req.params
  const { p_color } = req.query

  const productSizes = await db_querys.selectProductSize(p_id, p_color)
  res.send(productSizes)
})

router.post('/:p_id/like', async (req, res) => {
  const { p_id } = req.params
  const { u_id, like_status } = req.body

  if (like_status === 'false') {
    await db_querys.insertProductLike(p_id, u_id)

    await db_querys.updateProductLikeOn(p_id, u_id)
  } else {
    await db_querys.updateProductLikeOff(p_id, u_id)
  }

  res.send({ status: 'success' })
})

router.post('/:p_id/review', async (req, res) => {
  const { p_id } = req.params
  const { u_id, r_contents } = req.body

  await db_querys.insertProductReview(p_id, u_id, r_contents)

  res.redirect(`/products/${p_id}`)
})

router.post('/:p_id/review/update', async (req, res) => {
  const { r_contents, r_id } = req.body

  await db_querys.updateProductReview(r_contents, r_id)

  res.send({ status: 'success' })
})

router.post('/:p_id/review/delete', async (req, res) => {
  const { r_id } = req.body

  await db_querys.deleteProductReview(r_id)

  res.send({ status: 'success' })
})

export default router
