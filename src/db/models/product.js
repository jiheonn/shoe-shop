const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.Brand, {
        foreignKey: 'brands_id',
        onDelete: 'cascade',
      })
      this.belongsTo(models.Category, {
        foreignKey: 'categories_id',
        onDelete: 'cascade',
      })
      this.hasMany(models.ProductDetail, {
        onDelete: 'cascade',
      })
      this.hasMany(models.Review, {
        onDelete: 'cascade',
      })
      this.hasMany(models.OrderDetail, {
        onDelete: 'cascade',
      })
      this.hasMany(models.Like, {
        onDelete: 'cascade',
      })
    }
  }
  Product.init(
    {
      brands_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categorires_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(7, 0),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registration_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Product',
    },
  )
  return Product
}
