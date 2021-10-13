module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'like',
      [
        {
          id: 1,
          product_id: 5,
          user_id: 1,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          product_id: 7,
          user_id: 2,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          product_id: 7,
          user_id: 3,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          product_id: 1,
          user_id: 4,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          product_id: 6,
          user_id: 1,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          product_id: 13,
          user_id: 2,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          product_id: 14,
          user_id: 3,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          product_id: 14,
          user_id: 4,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          product_id: 12,
          user_id: 1,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          product_id: 8,
          user_id: 2,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('like', null, {})
  },
}
