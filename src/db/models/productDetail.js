const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
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
    }
  }
  ProductDetail.init(
    {
      product_id: DataTypes.STRING,
      size: DataTypes.STRING,
      color: DataTypes.STRING,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ProductDetail',
    },
  )
  return ProductDetail
}
