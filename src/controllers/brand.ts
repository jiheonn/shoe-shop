import * as express from 'express'

import { Product, Brand, Category } from '../db/models'
import { formatProductInfo } from '../format'

const getBrands = async (req: express.Request, res: express.Response) => {
  const username = req.user ? req.user.u_name : ''

  const brandId = Number.parseInt(req.params.id, 10)

  const products = await Product.findAll({
    where: {
      brandId,
    },
    raw: true,
  })

  const brands = await Brand.findAll({ raw: true })

  const brandName = brands.filter(brand => brand.id === brandId)

  const categories = await Category.findAll({ raw: true })

  res.render('brands', {
    username,
    brandId,
    brandName: brandName[0].name,
    products: formatProductInfo(products),
    brands,
    categories,
  })
}

export default { getBrands }
