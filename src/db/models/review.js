const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
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
  Review.init(
    {
      product_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      contents: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Review',
    },
  )
  return Review
}
