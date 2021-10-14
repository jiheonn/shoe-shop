module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'orders',
      [
        {
          id: 1,
          users_id: 1,
          amount: 159200,
          order_date: new Date(2021, 7, 1),
        },
        {
          id: 2,
          users_id: 2,
          amount: 436300,
          order_date: new Date(2021, 7, 1),
        },
        {
          id: 3,
          users_id: 3,
          amount: 318400,
          order_date: new Date(2021, 7, 3),
        },
        {
          id: 4,
          users_id: 4,
          amount: 231000,
          order_date: new Date(2021, 7, 5),
        },
        {
          id: 5,
          users_id: 1,
          amount: 79800,
          order_date: new Date(2021, 7, 5),
        },
        {
          id: 6,
          users_id: 2,
          amount: 70000,
          order_date: new Date(2021, 7, 13),
        },
        {
          id: 7,
          users_id: 3,
          amount: 318000,
          order_date: new Date(2021, 7, 14),
        },
        {
          id: 8,
          users_id: 4,
          amount: 138600,
          order_date: new Date(2021, 7, 16),
        },
        {
          id: 9,
          users_id: 1,
          amount: 69980,
          order_date: new Date(2021, 7, 20),
        },
        {
          id: 10,
          users_id: 2,
          amount: 138600,
          order_date: new Date(2021, 7, 21),
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('orders', null, {})
  },
}
