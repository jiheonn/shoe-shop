import formater from '../format/formater'
import db_querys from '../db/querys'

const getBrands = async (req, res) => {
  const username = req.user ? req.user.u_name : ''

  const { b_id } = req.params
  const { b_name } = req.query

  const rows = await db_querys.selectBrandProduct(b_id)
  const productList = formater.productInfoFormat(rows)

  const brandList = await db_querys.selectBrandList()
  const categoryList = await db_querys.selectcategoryList()

  res.render('brands', {
    username,
    b_id,
    b_name,
    productList,
    brandList,
    categoryList,
  })
}

export default {
  getBrands,
}
