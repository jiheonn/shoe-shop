const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      this.belongsTo(models.Product, {
        as: 'products',
        foreignKey: 'productId',
        onDelete: 'CASCADE',
      })
      this.belongsTo(models.User, {
        as: 'users',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      })
    }
  }
  Like.init(
    {
      productId: {
        field: 'products_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        field: 'users_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Like',
    },
  )
  return Like
}
