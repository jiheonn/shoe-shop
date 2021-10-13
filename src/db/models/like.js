const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: 'product_id',
        onDelete: 'cascade',
      })
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
      })
    }
  }
  Like.init(
    {
      product_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      status: {
        type: DataTypes.BOOLEAN,
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
