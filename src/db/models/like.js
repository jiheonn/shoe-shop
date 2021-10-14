const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
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
  Like.init(
    {
      products_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      users_id: {
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
