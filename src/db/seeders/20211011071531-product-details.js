module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'product_details',
      [
        {
          products_id: 5,
          size: '250',
          color: 'black-white',
          stock: 7,
        },
        {
          products_id: 5,
          size: '260',
          color: 'black-white',
          stock: 0,
        },
        {
          products_id: 5,
          size: '270',
          color: 'black-white',
          stock: 1,
        },
        {
          products_id: 3,
          size: '260',
          color: 'black',
          stock: 11,
        },
        {
          products_id: 3,
          size: '270',
          color: 'black',
          stock: 32,
        },
        {
          products_id: 3,
          size: '280',
          color: 'black',
          stock: 21,
        },
        {
          products_id: 7,
          size: '220',
          color: 'yellow-blue',
          stock: 12,
        },
        {
          products_id: 7,
          size: '230',
          color: 'yellow-blue',
          stock: 2,
        },
        {
          products_id: 7,
          size: '240',
          color: 'yellow-blue',
          stock: 7,
        },
        {
          products_id: 1,
          size: '240',
          color: 'white',
          stock: 3,
        },
        {
          products_id: 1,
          size: '250',
          color: 'white',
          stock: 12,
        },
        {
          products_id: 1,
          size: '260',
          color: 'white',
          stock: 21,
        },
        {
          products_id: 1,
          size: '270',
          color: 'white',
          stock: 10,
        },
        {
          products_id: 6,
          size: '260',
          color: 'green',
          stock: 3,
        },
        {
          products_id: 6,
          size: '270',
          color: 'green',
          stock: 6,
        },
        {
          products_id: 13,
          size: '250',
          color: 'white-black',
          stock: 4,
        },
        {
          products_id: 13,
          size: '260',
          color: 'white-black',
          stock: 5,
        },
        {
          products_id: 14,
          size: '220',
          color: 'white',
          stock: 8,
        },
        {
          products_id: 14,
          size: '230',
          color: 'white',
          stock: 0,
        },
        {
          products_id: 4,
          size: '250',
          color: 'white-black',
          stock: 3,
        },
        {
          products_id: 4,
          size: '260',
          color: 'white-black',
          stock: 2,
        },
        {
          products_id: 2,
          size: '260',
          color: 'white-orange',
          stock: 7,
        },
        {
          products_id: 2,
          size: '270',
          color: 'white-orange',
          stock: 8,
        },
        {
          products_id: 12,
          size: '230',
          color: 'pink',
          stock: 3,
        },
        {
          products_id: 12,
          size: '240',
          color: 'pink',
          stock: 1,
        },
        {
          products_id: 10,
          size: '250',
          color: 'white',
          stock: 2,
        },
        {
          products_id: 10,
          size: '260',
          color: 'white',
          stock: 31,
        },
        {
          products_id: 11,
          size: '260',
          color: 'white',
          stock: 0,
        },
        {
          products_id: 11,
          size: '270',
          color: 'white',
          stock: 0,
        },
        {
          products_id: 8,
          size: '250',
          color: 'green',
          stock: 3,
        },
        {
          products_id: 8,
          size: '260',
          color: 'green',
          stock: 4,
        },
        {
          products_id: 9,
          size: '250',
          color: 'black-white',
          stock: 34,
        },
        {
          products_id: 9,
          size: '260',
          color: 'black-white',
          stock: 6,
        },
      ],
      {},
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('product_details', null, {})
  },
}
