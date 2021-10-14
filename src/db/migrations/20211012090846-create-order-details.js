module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_details', {
      orders_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'orders',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      products_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    })
  },
  down: async queryInterface => {
    await queryInterface.dropTable('order_details')
  },
}
