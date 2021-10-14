module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          email: 'test@gmail.com',
          password: 'qwe123!@#',
          name: '남주혁',
        },
        {
          id: 2,
          email: 'test1@naver.com',
          password: 'qwe123!@#',
          name: '배수지',
        },
        {
          id: 3,
          email: 'test2@gmail.com',
          password: 'qwe123!@#',
          name: '한태평',
        },
        {
          id: 4,
          email: 'test3@naver.com',
          password: 'qwe123!@#',
          name: '남도산',
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('users', null, {})
  },
}
