module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_details', {
      products_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      size: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      stock: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    })
  },
  down: async queryInterface => {
    await queryInterface.dropTable('product_details')
  },
}
