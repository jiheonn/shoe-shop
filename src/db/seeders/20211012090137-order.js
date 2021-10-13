module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'order',
      [
        {
          id: 1,
          user_id: 1,
          amount: 159200,
          createdAt: new Date(2021, 7, 1),
          updatedAt: new Date(2021, 7, 1),
        },
        {
          id: 2,
          user_id: 2,
          amount: 436300,
          createdAt: new Date(2021, 7, 1),
          updatedAt: new Date(2021, 7, 1),
        },
        {
          id: 3,
          user_id: 3,
          amount: 318400,
          createdAt: new Date(2021, 7, 3),
          updatedAt: new Date(2021, 7, 3),
        },
        {
          id: 4,
          user_id: 4,
          amount: 231000,
          createdAt: new Date(2021, 7, 5),
          updatedAt: new Date(2021, 7, 5),
        },
        {
          id: 5,
          user_id: 1,
          amount: 79800,
          createdAt: new Date(2021, 7, 5),
          updatedAt: new Date(2021, 7, 5),
        },
        {
          id: 6,
          user_id: 2,
          amount: 70000,
          createdAt: new Date(2021, 7, 13),
          updatedAt: new Date(2021, 7, 13),
        },
        {
          id: 7,
          user_id: 3,
          amount: 318000,
          createdAt: new Date(2021, 7, 14),
          updatedAt: new Date(2021, 7, 14),
        },
        {
          id: 8,
          user_id: 4,
          amount: 138600,
          createdAt: new Date(2021, 7, 16),
          updatedAt: new Date(2021, 7, 16),
        },
        {
          id: 9,
          user_id: 1,
          amount: 69980,
          createdAt: new Date(2021, 7, 20),
          updatedAt: new Date(2021, 7, 20),
        },
        {
          id: 10,
          user_id: 2,
          amount: 138600,
          createdAt: new Date(2021, 7, 21),
          updatedAt: new Date(2021, 7, 21),
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('order', null, {})
  },
}
