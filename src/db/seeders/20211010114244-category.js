module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'category',
      [
        {
          id: 1,
          name: '운동화',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: '슬리퍼',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: '스포츠',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('category', null, {})
  },
}
