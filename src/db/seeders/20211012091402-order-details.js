module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'order_details',
      [
        {
          orders_id: 1,
          products_id: 1,
          quantity: 1,
        },
        {
          orders_id: 2,
          products_id: 1,
          quantity: 2,
        },
        {
          orders_id: 2,
          products_id: 6,
          quantity: 1,
        },
        {
          orders_id: 3,
          products_id: 1,
          quantity: 2,
        },
        {
          orders_id: 4,
          products_id: 7,
          quantity: 1,
        },
        {
          orders_id: 4,
          products_id: 5,
          quantity: 2,
        },
        {
          orders_id: 5,
          products_id: 13,
          quantity: 2,
        },
        {
          orders_id: 6,
          products_id: 14,
          quantity: 1,
        },
        {
          orders_id: 7,
          products_id: 7,
          quantity: 2,
        },
        {
          orders_id: 8,
          products_id: 10,
          quantity: 1,
        },
        {
          orders_id: 9,
          products_id: 9,
          quantity: 2,
        },
        {
          orders_id: 10,
          products_id: 10,
          quantity: 1,
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('order_details', null, {})
  },
}
