module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          id: 1,
          email: 'test@gmail.com',
          password: 'qwe123!@#',
          name: '남주혁',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          email: 'test1@naver.com',
          password: 'qwe123!@#',
          name: '배수지',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          email: 'test2@gmail.com',
          password: 'qwe123!@#',
          name: '한태평',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          email: 'test3@naver.com',
          password: 'qwe123!@#',
          name: '남도산',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('user', null, {})
  },
}
