module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'brands',
      [
        {
          id: 1,
          name: 'Nike',
        },
        {
          id: 2,
          name: 'Adidas',
        },
        {
          id: 3,
          name: 'Discovery',
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('brands', null, {})
  },
}
