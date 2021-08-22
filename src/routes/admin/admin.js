import express from 'express'
import passport from 'passport'
import multer from 'multer'
import path from 'path'
import moment from 'moment'
import db_querys from '../../db/admin/querys'
import formater from '../../format/formater'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, 'src/public/product/img/')
  },
  filename: (req, file, done) => {
    done(null, `${req.body.p_id}${path.extname(file.originalname)}`)
  },
})
const uploader = multer({ storage })

/* /admin */
router.get('/', (req, res) => {
  if (!req.user || req.user.u_type !== 1) {
    req.flash('error', '관리자 권한이 없습니다.')

    res.redirect('/admin/login')
  }

  res.render('admin/index')
})

router.get('/login', (req, res) => {
  if (req.user && req.user.u_type === 1) {
    res.redirect('/admin')
  }

  const message = req.flash('error')

  res.render('admin/login', { message })
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/admin/users',
    failureRedirect: '/admin/login',
    failureFlash: true,
  })
)

router.get('/users', async (req, res) => {
  const userList = await db_querys.selectUserList()

  res.render('admin/users', { userList })
})

router.get('/brands', async (req, res) => {
  const brandList = await db_querys.selectBrandList()

  res.render('admin/brands', { brandList })
})

router.get('/brands/add', async (req, res) => {
  res.render('admin/add-brand')
})

router.post('/brands/add', async (req, res) => {
  const { b_name } = req.body

  await db_querys.insertBrand(b_name)

  res.redirect('/admin/brands')
})

router.get('/products', async (req, res) => {
  const rows = await db_querys.selectProductList()
  const productList = formater.productInfoFormat(rows)

  res.render('admin/products', { productList })
})

router.get('/products/add', async (req, res) => {
  const brandList = await db_querys.selectBrandList()
  const categoryList = await db_querys.selectcategoryList()

  res.render('admin/add-product', { brandList, categoryList })
})

router.post('/products/add', uploader.single('p_image'), async (req, res) => {
  const p_image = `/product/img/${req.body.p_id}${path.extname(
    req.file.originalname
  )}`
  const p_reg_date = moment().format('YYYY-MM-DD')

  const newProductInfo = {
    ...req.body,
    p_image,
    p_reg_date,
  }

  await db_querys.insertProduct(newProductInfo)

  res.redirect('/admin/products')
})

router.post('/products/delete', async (req, res) => {
  const { p_id } = req.body

  await db_querys.deleteProduct(p_id)

  res.send({ status: 'success' })
})

router.get('/products/modify/:p_id', async (req, res) => {
  const { p_id } = req.params

  const productInfo = await db_querys.selectProduct(p_id)

  const brandList = await db_querys.selectBrandList()
  const categoryList = await db_querys.selectcategoryList()

  res.render('admin/modify-product', { productInfo, brandList, categoryList })
})

router.post(
  '/products/modify/:p_id',
  uploader.single('p_image'),
  async (req, res) => {
    const { p_id } = req.params

    const p_image =
      req.file !== undefined
        ? `/product/img/${req.body.p_id}${path.extname(req.file.originalname)}`
        : ''

    const newProductInfo = {
      ...req.body,
      p_image,
    }
    await db_querys.updateProduct(p_id, newProductInfo)

    res.redirect('/admin/products')
  }
)

router.get('/products/details', async (req, res) => {
  const productDetailList = await db_querys.selectProductDetailList()

  res.render('admin/products-details', { productDetailList })
})

router.get('/orders', async (req, res) => {
  const rows = await db_querys.selectOrderList()

  const orderList = rows.map(row => {
    const order = row

    order.o_price = formater.priceFormat(order.o_price)
    order.o_date = formater.dateFormat(order.o_date)

    return order
  })

  res.render('admin/orders', { orderList })
})

router.get('/orders/details', async (req, res) => {
  const orderDetailList = await db_querys.selectOrderDetailList()

  res.render('admin/orders-details', { orderDetailList })
})

export default router
