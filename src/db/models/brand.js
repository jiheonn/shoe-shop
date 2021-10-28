const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      this.hasMany(models.Product, {
        as: 'products',
        foreignKey: 'brandId',
        onDelete: 'CASCADE',
      })
    }
  }
  Brand.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Brand',
    },
  )
  return Brand
}
