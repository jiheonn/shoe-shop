const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: 'products_id',
        onDelete: 'cascade',
      })
    }
  }
  ProductDetail.init(
    {
      products_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ProductDetail',
    },
  )
  return ProductDetail
}
