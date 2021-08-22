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
const selectUserList = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          u_id, u_name, u_type
        FROM
          users
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

const selectBrandList = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          *
        FROM
          brands
      `

      connection.query(sql, (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const selectProductList = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          *
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
        ORDER BY
          p.p_id ASC
      `

      connection.query(sql, (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const selectProductDetailList = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          *
        FROM
          productDetails AS pd
        JOIN
          products AS p
          ON
            pd.p_id = p.p_id
      `

      connection.query(sql, (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const selectOrderList = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          *
        FROM
          orders AS o
        JOIN
          users AS u
          ON
            o.u_id = u.u_id
        ORDER BY
          o.o_date DESC
      `

      connection.query(sql, (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const selectOrderDetailList = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          *
        FROM
          orderDetails
      `

      connection.query(sql, (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const insertBrand = async b_name => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        INSERT INTO
          brands (b_name)
        VALUES
          (?)
      `

      connection.query(sql, [b_name], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const selectcategoryList = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          *
        FROM
          categories
      `

      connection.query(sql, [], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const insertProduct = async newProductInfo => {
  const {
    p_id,
    b_id,
    c_id,
    p_name,
    p_price,
    p_description,
    p_image,
    p_type,
    p_reg_date,
  } = newProductInfo

  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        INSERT INTO products
          (p_id, b_id, c_id, p_name, p_price, p_description, p_image, p_type, p_reg_date)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

      connection.query(
        sql,
        [
          p_id,
          b_id,
          c_id,
          p_name,
          p_price,
          p_description,
          p_image,
          p_type,
          p_reg_date,
        ],
        (queryError, rows) => {
          if (queryError) reject(queryError)

          resolve(rows)
        }
      )
      connection.release()
    })
  })
}

const selectProduct = async p_id => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          *
        FROM
          products
        WHERE
          p_id = ?
      `

      connection.query(sql, [p_id], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows[0])
      })
      connection.release()
    })
  })
}

const updateProduct = async (p_id, newProductInfo) => {
  const { b_id, c_id, p_name, p_price, p_description, p_image, p_type } =
    newProductInfo

  let sql
  let parmas

  if (newProductInfo.p_image === '') {
    sql = `
      UPDATE
        products
      SET
        b_id = ?,
        c_id = ?,
        p_name = ?,
        p_price = ?,
        p_description = ?,
        p_type = ?
      WHERE
        p_id = ?
    `
    parmas = [b_id, c_id, p_name, p_price, p_description, p_type, p_id]
  } else {
    sql = `
      UPDATE
        products
      SET
        b_id = ?,
        c_id = ?,
        p_name = ?,
        p_price = ?,
        p_description = ?,
        p_image = ?,
        p_type = ?
      WHERE
        p_id = ?
    `
    parmas = [b_id, c_id, p_name, p_price, p_description, p_image, p_type, p_id]
  }

  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      connection.query(sql, parmas, (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const deleteProduct = async p_id => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        DELETE
        FROM
          products
        WHERE
          p_id = ?
      `

      connection.query(sql, [p_id], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows[0])
      })
      connection.release()
    })
  })
}

export default {
  selectUserList,
  selectBrandList,
  selectProductList,
  selectProductDetailList,
  selectOrderList,
  selectOrderDetailList,
  insertBrand,
  selectcategoryList,
  insertProduct,
  selectProduct,
  updateProduct,
  deleteProduct,
}
