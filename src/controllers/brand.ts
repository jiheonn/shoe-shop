import * as express from 'express'

import { Product, Brand, Category } from '../db/models'
import { formatProductInfo } from '../format'

const getBrandProducts = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  const brandId: number = Number.parseInt(req.params.id, 10)

  const products = await Product.findAndCountAll({
    where: {
      brandId,
    },
    raw: true,
    limit: 6,
  })

  const brands = await Brand.findAll({ raw: true })
  const categories = await Category.findAll({ raw: true })

  const selectedBrand = brands.find(brand => brand.id === brandId)

  res.render('brand', {
    products: formatProductInfo(products.rows),
    page: Math.ceil(products.count / 6),
    brandId: selectedBrand.id,
    brandName: selectedBrand.name,
    username: req.user ? req.user.name : '',
    brands,
    categories,
  })
}

export default { getBrandProducts }
