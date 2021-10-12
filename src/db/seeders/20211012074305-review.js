module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'review',
      [
        {
          id: 1,
          product_id: 3,
          user_id: 1,
          contents: '이뻐요! 만족 만족',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          product_id: 7,
          user_id: 2,
          contents: '배송이 빠르고 제품도 좋습니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          product_id: 6,
          user_id: 3,
          contents: '배송이 빠르고 제품도 좋습니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          product_id: 13,
          user_id: 4,
          contents: '배송이 빠르고 제품도 좋습니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          product_id: 14,
          user_id: 1,
          contents: '선물로 구매했는데 너무 좋아하네요 굿!!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          product_id: 4,
          user_id: 2,
          contents: '2주 째 신고있습니다. 너무 맘에 들어요',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          product_id: 2,
          user_id: 3,
          contents: '가볍고 좋네요',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          product_id: 10,
          user_id: 4,
          contents: '선물용으로 넘 좋아요',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          product_id: 11,
          user_id: 1,
          contents: '감사합니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          product_id: 8,
          user_id: 2,
          contents: '사진과 실물이 조금 달라서 속상합니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('review', null, {})
  },
}
