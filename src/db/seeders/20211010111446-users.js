module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          email: 'test@gmail.com',
          password:
            '9etuJvDA3AkiK6v1523QzgLWfaJ/vPRoEXWhPtOi3XG2+PBLRBFo0GCVsfGYI2PmaUm9QAALwfM/JVPxQPHB6w==',
          salt: 'QtxZhk1XWh6VJCcyFPNYPK8rWkg+i0EU1I4OcSakeXeL17dfklvUWoFHUJbuSFQSSjY6AK2lAt5PTIzl16i8Sg==',
          name: '남주혁',
        },
        {
          id: 2,
          email: 'test1@naver.com',
          password:
            'Zx3BIiSN1K7Xl357/MQ/r98KWroXcYGFOjcy+ZGG7M1ezHUL0Ml0egMfdmqi/5rnayfzweGpf3zCl35+vtgNng==',
          salt: 'IxPYY0HIfzhdPBWwL1U9CaEZL6huMANSDsEnNzM0vZIpwgcCkhcAb7XmDI3dL2iwBFYVNm6uCC3xmETzesaOeg==',
          name: '배수지',
        },
        {
          id: 3,
          email: 'test2@gmail.com',
          password:
            'f96h5nCjfDFBkm8NRFy/mJB0HDBAUbHjV/B1jRNoluh/GeKU+h+pUZJZ08HghhXkdRG3h7MVqrPchhu98eTADA==',
          salt: 'cPDwrYAkBJjFLJBReY8GByhGMbIT6hUtAa+JWI8tEIZOYvkV36FcQVPI/SRNiRjJC19tfueSyejmjzt5CtM/9g==',
          name: '한태평',
        },
        {
          id: 4,
          email: 'test3@naver.com',
          password:
            'x7JgvDHLwHMmS49dtvnvraJfw2SPunOQdXxaedoNxucSCrdNDkvc39EPPV1GViMVFS6O8tFF/QDVnX/GKt/qkQ==',
          salt: 'mJO9gtPwpTnQS8xDYXmFJ/hXTKxKy6NLrgXenXzWzpx4l0FHio+wrHc4FtPnR9MMFRmc9CHvRhDOyb1O6TEkeA==',
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
