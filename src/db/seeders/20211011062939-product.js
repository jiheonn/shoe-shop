module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'product',
      [
        {
          id: 1,
          brand_id: 1,
          category_id: 1,
          code: '921826-101',
          name: '나이키 에어맥스 97 OG',
          price: 159200,
          description:
            '특유의 물결 라인과 반사체 파이핑, 그리고 발 전체에 적용된 맥스 에어 쿠셔닝과 같은 디테일을 그대로 간직한 디자인',
          image: '/product/img/921826-101.jpg',
          type: '남녀공용',
          createdAt: new Date(2018, 1, 18),
          updatedAt: new Date(2018, 1, 18),
        },
        {
          id: 2,
          brand_id: 2,
          category_id: 3,
          code: 'AQ0021',
          name: '아디다스 하든 LS 2 버클',
          price: 58780,
          description:
            '코트를 압도하는 폭발적인 스피드. 혁신적인 핏과 강력한 락다운으로 더욱 자유로운 움직임을 이끄는 아디다스 농구화',
          image: '/product/img/AQ0021.jpg',
          type: '남성용',
          createdAt: new Date(2018, 7, 21),
          updatedAt: new Date(2018, 7, 21),
        },
        {
          id: 3,
          brand_id: 1,
          category_id: 2,
          code: 'AR4494-003',
          name: '나이키 울트라 컴포트 3',
          price: 49000,
          description: 'NIKE ULTRA COMFORT 3 SLIDE',
          image: '/product/img/AR4494-003.jpg',
          type: '남성용',
          createdAt: new Date(2020, 5, 25),
          updatedAt: new Date(2020, 5, 25),
        },
        {
          id: 4,
          brand_id: 2,
          category_id: 2,
          code: 'BA8775',
          name: '아디다스 알파바운스 슬라이드',
          price: 32380,
          description:
            '편안한 휴식과 재충전을 위한 슬라이드, 편안하고 부드러운 폼 라이닝, EVA 아웃솔',
          image: '/product/img/BA8775.jpg',
          type: '남녀공용',
          createdAt: new Date(2017, 2, 21),
          updatedAt: new Date(2017, 2, 21),
        },
        {
          id: 5,
          brand_id: 1,
          category_id: 2,
          code: 'CN9675-005',
          name: '나이키 빅토리 원 슬라이드',
          price: 36000,
          description:
            '나이키 빅토리 원은 해변에서 경기장 관람석까지 장소를 불문한 머스트해브 클래식 아이템입니다. 가볍고 편안하여 착용하기 쉬우며 더 부드럽고 반응성이 좋은 폼으로 업그레이드 되었습니다.',
          image: '/product/img/CN9675-005.jpeg',
          type: '남녀공용',
          createdAt: new Date(2021, 0, 21),
          updatedAt: new Date(2021, 0, 21),
        },
        {
          id: 6,
          brand_id: 1,
          category_id: 3,
          code: 'CV1001-107',
          name: '나이키 줌 머큐리얼 베이퍼 14 프로 TF',
          price: 117900,
          description:
            '나이키 줌 머큐리얼 베이퍼 14 프로 TF는 어느 곳에서도 뛰어다닐 때에 가벼운 느낌을 주며 아름다운 슈팅을 만들어 드립니다',
          image: '/product/img/CV1001-107.jpg',
          type: '남성용',
          createdAt: new Date(2021, 3, 12),
          updatedAt: new Date(2021, 3, 12),
        },
        {
          id: 7,
          brand_id: 1,
          category_id: 1,
          code: 'CW6062-300',
          name: '나이키 에어 줌 테라 카이거 7',
          price: 159000,
          description:
            '나이키 에어 줌 테라 카이거 7을 신고 트레일을 자유롭게 달려보세요. 빠르고 가벼운 신발로 통기성이 좋은 동시에 바위가 많은 지면을 달릴때에도 안정적인 착화감을 선사합니다.',
          image: '/product/img/CW6062-300.jpg',
          type: '여성용',
          createdAt: new Date(2021, 4, 7),
          updatedAt: new Date(2021, 4, 7),
        },
        {
          id: 8,
          brand_id: 3,
          category_id: 2,
          code: 'DXSH5B131-KA',
          name: '디스커버리 익스페디션 텐션 슬라이드',
          price: 49000,
          description: '편안한 쿠셔닝과 트렌디함 리커버리 샌들',
          image: '/product/img/DXSH5B131-KA.jpg',
          type: '남녀공용',
          createdAt: new Date(2021, 4, 29),
          updatedAt: new Date(2021, 4, 29),
        },
        {
          id: 9,
          brand_id: 3,
          category_id: 2,
          code: 'DXSH70031-NY',
          name: '디스커버리 익스페디션 샌드라인 3',
          price: 34990,
          description: '심플하고 이쁜 디스커버리 슬리퍼',
          image: '/product/img/DXSH70031-NY.jpg',
          type: '남녀공용',
          createdAt: new Date(2020, 0, 12),
          updatedAt: new Date(2021, 0, 12),
        },
        {
          id: 10,
          brand_id: 3,
          category_id: 1,
          code: 'DXSHA1011-WH',
          name: '디스커버리 익스페디션 버킷 디워커 V2',
          price: 138600,
          description: '편안하고 안정적인 데일리 운동화',
          image: '/product/img/DXSHA1011-WH.jpg',
          type: '남녀공용',
          createdAt: new Date(2019, 11, 13),
          updatedAt: new Date(2019, 11, 13),
        },
        {
          id: 11,
          brand_id: 3,
          category_id: 1,
          code: 'DXSHE2031-MU',
          name: '디스커버리 익스페디션 비글 V2',
          price: 112000,
          description: '화창한 날의 러닝에 이상적인 쾌적하고 세련된 슈즈',
          image: '/product/img/DXSHE2031-MU.jpg',
          type: '남녀공용',
          createdAt: new Date(2020, 0, 19),
          updatedAt: new Date(2020, 0, 19),
        },
        {
          id: 12,
          brand_id: 2,
          category_id: 2,
          code: 'FY6045',
          name: '아디다스 아딜렛 크록',
          price: 21880,
          description:
            '활발하게 움직이는 작은 발을 편안하게 감싸 활기찬 여름 활동을 만들어줍니다',
          image: '/product/img/FY6045.jpg',
          type: '여성용',
          createdAt: new Date(2021, 2, 21),
          updatedAt: new Date(2021, 2, 21),
        },
        {
          id: 13,
          brand_id: 2,
          category_id: 1,
          code: 'GZ3461',
          name: '아디다스 알파바운스 TD',
          price: 39900,
          description: '아디다스만의 심플함이 담긴 운동화',
          image: '/product/img/GZ3461.jpg',
          type: '남녀공용',
          createdAt: new Date(2021, 5, 30),
          updatedAt: new Date(2021, 5, 30),
        },
        {
          id: 14,
          brand_id: 2,
          category_id: 1,
          code: 'H04269',
          name: '아디다스 오젤리아 W',
          price: 70000,
          description: '아디다스의 신상 어글리 슈즈',
          image: '/product/img/H04269.jpg',
          type: '여성용',
          createdAt: new Date(2021, 6, 1),
          updatedAt: new Date(2021, 6, 1),
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('product', null, {})
  },
}
