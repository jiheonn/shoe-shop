import db_querys from '../db/querys'
import formater from '../format/formater'

const displayIndex = async (req, res) => {
  const username = req.user ? req.user.u_name : ''

  const latestedShoes6 = await db_querys.selectLatestLimit6()
  const popularShoes6 = await db_querys.selectPopularLimit6()

  const brandList = await db_querys.selectBrandList()

  res.render('index', {
    username,
    latestedShoes6: formater.productInfoFormat(latestedShoes6),
    popularShoes6: formater.productInfoFormat(popularShoes6),
    brandList,
  })
}

export default { displayIndex }
