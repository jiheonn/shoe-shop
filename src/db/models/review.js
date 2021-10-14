const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: 'products_id',
        onDelete: 'cascade',
      })
      this.belongsTo(models.User, {
        foreignKey: 'users_id',
        onDelete: 'cascade',
      })
    }
  }
  Review.init(
    {
      products_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      users_id: {
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
