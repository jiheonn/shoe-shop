const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      this.belongsTo(models.Order, {
        foreignKey: 'orders_id',
        onDelete: 'cascade',
      })
      this.belongsTo(models.Product, {
        foreignKey: 'products_id',
        onDelete: 'cascade',
      })
    }
  }
  OrderDetail.init(
    {
      orders_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      products_id: {
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
    },
  )
  return OrderDetail
}
