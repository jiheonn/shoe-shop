module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'order_detail',
      [
        {
          order_id: 1,
          product_id: 1,
          quantity: 1,
          createdAt: new Date(2021, 7, 1),
          updatedAt: new Date(2021, 7, 1),
        },
        {
          order_id: 2,
          product_id: 1,
          quantity: 2,
          createdAt: new Date(2021, 7, 1),
          updatedAt: new Date(2021, 7, 1),
        },
        {
          order_id: 2,
          product_id: 6,
          quantity: 1,
          createdAt: new Date(2021, 7, 1),
          updatedAt: new Date(2021, 7, 1),
        },
        {
          order_id: 3,
          product_id: 1,
          quantity: 2,
          createdAt: new Date(2021, 7, 3),
          updatedAt: new Date(2021, 7, 3),
        },
        {
          order_id: 4,
          product_id: 7,
          quantity: 1,
          createdAt: new Date(2021, 7, 5),
          updatedAt: new Date(2021, 7, 5),
        },
        {
          order_id: 4,
          product_id: 5,
          quantity: 2,
          createdAt: new Date(2021, 7, 5),
          updatedAt: new Date(2021, 7, 5),
        },
        {
          order_id: 5,
          product_id: 13,
          quantity: 2,
          createdAt: new Date(2021, 7, 5),
          updatedAt: new Date(2021, 7, 5),
        },
        {
          order_id: 6,
          product_id: 14,
          quantity: 1,
          createdAt: new Date(2021, 7, 13),
          updatedAt: new Date(2021, 7, 13),
        },
        {
          order_id: 7,
          product_id: 7,
          quantity: 2,
          createdAt: new Date(2021, 7, 14),
          updatedAt: new Date(2021, 7, 14),
        },
        {
          order_id: 8,
          product_id: 10,
          quantity: 1,
          createdAt: new Date(2021, 7, 16),
          updatedAt: new Date(2021, 7, 16),
        },
        {
          order_id: 9,
          product_id: 9,
          quantity: 2,
          createdAt: new Date(2021, 7, 20),
          updatedAt: new Date(2021, 7, 20),
        },
        {
          order_id: 10,
          product_id: 10,
          quantity: 1,
          createdAt: new Date(2021, 7, 21),
          updatedAt: new Date(2021, 7, 21),
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('order_detail', null, {})
  },
}
