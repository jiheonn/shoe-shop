import * as express from 'express'
import * as sequelize from 'sequelize'

import { Product, Brand, OrderDetail } from '../db/models'
import { formatProductInfo } from '../format'

const displayIndex = async (req: express.Request, res: express.Response) => {
  const username = req.user ? req.user.name : ''

  const recentProducts = await Product.findAll({
    order: [['registrationDate', 'DESC']],
    limit: 6,
    raw: true,
  })

  let popularProducts = await Product.findAll({
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
    limit: 6,
    subQuery: false,
  })
  popularProducts = popularProducts.map(el => el.get({ plain: true }))

  const brands = await Brand.findAll({ raw: true })

  res.render('index', {
    username,
    recentProducts: formatProductInfo(recentProducts),
    popularProducts: formatProductInfo(popularProducts),
    brands,
  })
}

export default { displayIndex }
