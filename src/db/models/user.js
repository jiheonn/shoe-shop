const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Review, {
        as: 'reviews',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      })
      this.hasMany(models.Order, {
        as: 'orders',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      })
      this.hasMany(models.Like, {
        as: 'likes',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      })
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
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
