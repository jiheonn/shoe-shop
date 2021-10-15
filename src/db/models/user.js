const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Review, {
        as: 'reviews',
        foreignKey: 'userId',
        onDelete: 'cascade',
      })
      this.hasMany(models.Order, {
        as: 'orders',
        foreignKey: 'userId',
        onDelete: 'cascade',
      })
      this.hasMany(models.Like, {
        as: 'likes',
        foreignKey: 'userId',
        onDelete: 'cascade',
      })
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  )
  return User
}
