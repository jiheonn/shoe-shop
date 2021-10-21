import * as express from 'express'
import * as sequelize from 'sequelize'

import { Product, Brand, OrderDetail } from '../db/models'
import { formatProductInfo } from '../format'

const displayIndex = async (req: express.Request, res: express.Response) => {
  const recentProducts = await Product.findAll({
    order: [['registrationDate', 'DESC']],
    limit: 6,
    raw: true,
  })

  const popularProducts = await Product.findAll({
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
    raw: true,
  })

  const brands = await Brand.findAll({ raw: true })

  res.render('index', {
    recentProducts: formatProductInfo(recentProducts),
    popularProducts: formatProductInfo(popularProducts),
    username: req.user ? req.user.name : '',
    brands,
  })
}

export default { displayIndex }
