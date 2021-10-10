module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'brand',
      [
        {
          id: 1,
          name: 'Nike',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Adidas',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Discovery',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('brand', null, {})
  },
}
