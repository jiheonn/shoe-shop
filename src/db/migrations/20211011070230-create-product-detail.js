module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_detail', {
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'product',
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
    await queryInterface.dropTable('product_detail')
  },
}
