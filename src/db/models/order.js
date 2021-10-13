const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
      })
      this.hasMany(models.OrderDetail, {
        onDelete: 'cascade',
      })
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL(7, 0),
    },
    {
      sequelize,
      modelName: 'Order',
    },
  )
  return Order
}
