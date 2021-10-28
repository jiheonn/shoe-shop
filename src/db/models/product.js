const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.Brand, {
        as: 'brands',
        foreignKey: 'brandId',
        onDelete: 'CASCADE',
      })
      this.belongsTo(models.Category, {
        as: 'categories',
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
      })
      this.hasMany(models.ProductDetail, {
        as: 'productDetails',
        foreignKey: 'productId',
        onDelete: 'CASCADE',
      })
      this.hasMany(models.Review, {
        as: 'reviews',
        foreignKey: 'productId',
        onDelete: 'CASCADE',
      })
      this.hasMany(models.OrderDetail, {
        as: 'orderDetails',
        foreignKey: 'productId',
        onDelete: 'CASCADE',
      })
      this.hasMany(models.Like, {
        as: 'likes',
        foreignKey: 'productId',
        onDelete: 'CASCADE',
      })
    }
  }
  Product.init(
    {
      brandId: {
        field: 'brands_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        field: 'categories_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        unique: true,
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
      registrationDate: {
        field: 'registration_date',
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
