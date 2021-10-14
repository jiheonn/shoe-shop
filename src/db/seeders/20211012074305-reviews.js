module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'reviews',
      [
        {
          id: 1,
          products_id: 3,
          users_id: 1,
          content: '이뻐요! 만족 만족',
          created_date: new Date(),
        },
        {
          id: 2,
          products_id: 7,
          users_id: 2,
          content: '배송이 빠르고 제품도 좋습니다.',
          created_date: new Date(),
        },
        {
          id: 3,
          products_id: 6,
          users_id: 3,
          content: '배송이 빠르고 제품도 좋습니다.',
          created_date: new Date(),
        },
        {
          id: 4,
          products_id: 13,
          users_id: 4,
          content: '배송이 빠르고 제품도 좋습니다.',
          created_date: new Date(),
        },
        {
          id: 5,
          products_id: 14,
          users_id: 1,
          content: '선물로 구매했는데 너무 좋아하네요 굿!!',
          created_date: new Date(),
        },
        {
          id: 6,
          products_id: 4,
          users_id: 2,
          content: '2주 째 신고있습니다. 너무 맘에 들어요',
          created_date: new Date(),
        },
        {
          id: 7,
          products_id: 2,
          users_id: 3,
          content: '가볍고 좋네요',
          created_date: new Date(),
        },
        {
          id: 8,
          products_id: 10,
          users_id: 4,
          content: '선물용으로 넘 좋아요',
          created_date: new Date(),
        },
        {
          id: 9,
          products_id: 11,
          users_id: 1,
          content: '감사합니다.',
          created_date: new Date(),
        },
        {
          id: 10,
          products_id: 8,
          users_id: 2,
          content: '사진과 실물이 조금 달라서 속상합니다.',
          created_date: new Date(),
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('reviews', null, {})
  },
}
