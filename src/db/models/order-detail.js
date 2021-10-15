const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      this.belongsTo(models.Order, {
        as: 'orders',
        foreignKey: 'orderId',
        onDelete: 'cascade',
      })
      this.belongsTo(models.Product, {
        as: 'products',
        foreignKey: 'productId',
        onDelete: 'cascade',
      })
    }
  }
  OrderDetail.init(
    {
      orderId: {
        field: 'orders_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        field: 'products_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'OrderDetail',
      tableName: 'order_details',
    },
  )
  OrderDetail.removeAttribute('id')
  return OrderDetail
}
