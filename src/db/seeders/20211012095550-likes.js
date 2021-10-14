module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'likes',
      [
        {
          id: 1,
          products_id: 5,
          users_id: 1,
          status: true,
        },
        {
          id: 2,
          products_id: 7,
          users_id: 2,
          status: true,
        },
        {
          id: 3,
          products_id: 7,
          users_id: 3,
          status: false,
        },
        {
          id: 4,
          products_id: 1,
          users_id: 4,
          status: true,
        },
        {
          id: 5,
          products_id: 6,
          users_id: 1,
          status: true,
        },
        {
          id: 6,
          products_id: 13,
          users_id: 2,
          status: false,
        },
        {
          id: 7,
          products_id: 14,
          users_id: 3,
          status: true,
        },
        {
          id: 8,
          products_id: 14,
          users_id: 4,
          status: true,
        },
        {
          id: 9,
          products_id: 12,
          users_id: 1,
          status: true,
        },
        {
          id: 10,
          products_id: 8,
          users_id: 2,
          status: true,
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('likes', null, {})
  },
}
