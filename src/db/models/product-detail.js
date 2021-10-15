const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
    static associate(models) {
      this.belongsTo(models.Product, {
        as: 'products',
        foreignKey: 'productId',
        onDelete: 'cascade',
      })
    }
  }
  ProductDetail.init(
    {
      productId: {
        field: 'products_id',
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
      tableName: 'product_details',
    },
  )
  ProductDetail.removeAttribute('id')
  return ProductDetail
}
