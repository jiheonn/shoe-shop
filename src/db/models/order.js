const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'users',
        foreignKey: 'userId',
        onDelete: 'cascade',
      })
      this.hasMany(models.OrderDetail, {
        as: 'orderDetails',
        foreignKey: 'orderId',
        onDelete: 'cascade',
      })
    }
  }
  Order.init(
    {
      userId: {
        field: 'users_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(7, 0),
        allowNull: false,
      },
      orderDate: {
        field: 'order_date',
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Order',
    },
  )
  return Order
}
