import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
})

/* eslint-disable no-new */
const selectProductList = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          p_id, p_name, p_price, p_image, p_type, p_reg_date
        FROM
          products
      `

      connection.query(sql, (queryError, rows) => {
        if (queryError) reject(queryError)

        // query 결과 반환
        resolve(rows)
      })
      // connection을 pool에 반환
      connection.release()
    })
  })
}

const selectProductInfo = async p_id => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          p_id, p_name, p_price, p_description, p_image, p_type, p_reg_date, b_name, c_name
        FROM
          products AS p
        JOIN
          brands AS b
        ON
          p.b_id = b.b_id
        JOIN
          categories AS c
        ON
          p.c_id = c.c_id
        WHERE
          p.p_id = ?
      `

      connection.query(sql, [p_id], (queryError, rows) => {
        if (queryError) reject(queryError)

        // query 결과 반환
        resolve(rows)
      })
      // connection을 pool에 반환
      connection.release()
    })
  })
}

const selectProductColors = async p_id => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          distinct p_color
        FROM
          productDetails
        WHERE
          p_id = ?
      `

      connection.query(sql, [p_id], (queryError, rows) => {
        if (queryError) reject(queryError)

        // query 결과 반환
        resolve(rows)
      })
      // connection을 pool에 반환
      connection.release()
    })
  })
}

const selectProductSize = async (p_id, p_color) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          p_size
        FROM
          productDetails
        WHERE
          p_id = ?
        AND
          p_color = ?
      `

      connection.query(sql, [p_id, p_color], (queryError, rows) => {
        if (queryError) reject(queryError)

        // query 결과 반환
        resolve(rows)
      })
      // connection을 pool에 반환
      connection.release()
    })
  })
}

const selectProductReview = async p_id => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          u_id, r_contents
        FROM
          reviews
        WHERE
          p_id = ?
        GROUP BY
          r_id
      `

      connection.query(sql, [p_id], (queryError, rows) => {
        if (queryError) reject(queryError)

        // query 결과 반환
        resolve(rows)
      })
      // connection을 pool에 반환
      connection.release()
    })
  })
}

const selectUserInfo = async u_id => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          *
        FROM
          users
        WHERE
          u_id = ?
      `

      connection.query(sql, [u_id], (queryError, rows) => {
        if (queryError) reject(queryError)

        // query 결과 반환
        resolve(rows[0])
      })
      // connection을 pool에 반환
      connection.release()
    })
  })
}

export default {
  selectProductList,
  selectProductInfo,
  selectProductColors,
  selectProductSize,
  selectProductReview,
  selectUserInfo,
}
