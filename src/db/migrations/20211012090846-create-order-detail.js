module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_detail', {
      order_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'order',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'product',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async queryInterface => {
    await queryInterface.dropTable('order_detail')
  },
}
