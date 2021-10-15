const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      this.belongsTo(models.Product, {
        as: 'products',
        foreignKey: 'productId',
        onDelete: 'cascade',
      })
      this.belongsTo(models.User, {
        as: 'users',
        foreignKey: 'userId',
        onDelete: 'cascade',
      })
    }
  }
  Review.init(
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
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Review',
    },
  )
  return Review
}
