module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          id: 1,
          name: '운동화',
        },
        {
          id: 2,
          name: '슬리퍼',
        },
        {
          id: 3,
          name: '스포츠',
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('categories', null, {})
  },
}
