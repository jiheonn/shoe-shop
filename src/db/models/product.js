const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Brand, {
        foreignKey: 'brand_id',
        onDelete: 'cascade',
      })
      this.belongsTo(models.Category, {
        foreignKey: 'category_id',
        onDelete: 'cascade',
      })
      this.hasMany(models.ProductDetail, {
        onDelete: 'cascade',
      })
      this.hasMany(models.Review, {
        onDelete: 'cascade',
      })
    }
  }
  Product.init(
    {
      brand_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(7, 0),
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  )
  return Product
}
