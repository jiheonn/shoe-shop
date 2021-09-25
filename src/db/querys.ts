import * as mysql from 'mysql'
import * as dotenv from 'dotenv'

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
        ORDER BY
          p_reg_date DESC;
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

        resolve(rows)
      })
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

        resolve(rows)
      })
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

        resolve(rows)
      })
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
          r_id, u_id, r_contents
        FROM
          reviews
        WHERE
          p_id = ?
        GROUP BY
          r_id
      `

      connection.query(sql, [p_id], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
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

        resolve(rows[0])
      })
      connection.release()
    })
  })
}

const selectProductLike = async p_id => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          count(l_id) AS like_count
        FROM
          likes
        WHERE
          p_id = ?
        AND
          like_check = true
        GROUP BY
          l_id
      `

      connection.query(sql, [p_id], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows[0] ? rows[0] : { like_count: 0 })
      })
      connection.release()
    })
  })
}

const selectProductUserLike = async (p_id, u_id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          like_check
        FROM
          likes
        WHERE
          p_id = ?
        AND
          u_id = ?
      `

      connection.query(sql, [p_id, u_id], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows[0] !== undefined ? rows[0] : { like_check: 0 })
      })
      connection.release()
    })
  })
}

const insertProductLike = async (p_id, u_id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        INSERT INTO
          likes (p_id, u_id)
        SELECT
          ?, ?
        FROM
          DUAL
        WHERE
          NOT EXISTS
            (SELECT like_check
              FROM likes
              WHERE p_id = ?
              AND u_id = ?)
      `

      connection.query(sql, [p_id, u_id, p_id, u_id], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const updateProductLikeOn = async (p_id, u_id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        UPDATE
          likes
        SET
          like_check = true
        WHERE
          p_id = ?
        AND
          u_id = ?
      `

      connection.query(sql, [p_id, u_id], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const updateProductLikeOff = async (p_id, u_id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        UPDATE
          likes
        SET
          like_check = false
        WHERE
          p_id = ?
        AND
          u_id = ?
      `

      connection.query(sql, [p_id, u_id], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const insertProductReview = async (p_id, u_id, r_contents) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        INSERT INTO
          reviews
            (p_id, u_id, r_contents)
        VALUES
          (?, ?, ?)
      `

      connection.query(sql, [p_id, u_id, r_contents], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const updateProductReview = async (r_contents, r_id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        UPDATE
          reviews
        SET
          r_contents = ?
        WHERE
          r_id = ?
      `

      connection.query(sql, [r_contents, r_id], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const deleteProductReview = async r_id => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        DELETE
          reviews
        FROM
          reviews
        WHERE
          r_id = ?
      `

      connection.query(sql, [r_id], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
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

      connection.query(sql, [], (queryError, rows) => {
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

const productOrderbyPopular = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          p.*, sum(od.p_quantity) AS p_order_count
        FROM
          products AS p
        LEFT OUTER JOIN
          orderDetails AS od
          ON
            p.p_id = od.p_id
        GROUP BY
          p.p_id
        ORDER BY
          p_order_count DESC;
      `

      connection.query(sql, [], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const productOrderbyReview = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          p.*, count(r.p_id) AS p_review_count
        FROM
          products AS p
        LEFT OUTER JOIN
          reviews AS r
          ON
            p.p_id = r.p_id
        GROUP BY
          p.p_id
        ORDER BY
          p_review_count desc
      `

      connection.query(sql, [], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const productOrderbyName = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          p_id, p_name, p_price, p_image, p_type, p_reg_date
        FROM
          products
        ORDER BY
          p_name ASC
      `

      connection.query(sql, [], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const productFilter = async (brand, category, p_type) => {
  let sql = `
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
  `

  let valid = false
  if (!brand.includes('0') && !brand.includes('브랜드')) {
    sql += `
      WHERE b.b_id = ${brand}
    `
    valid = true
  }

  if (!category.includes('0') && !category.includes('카테고리')) {
    if (valid) {
      sql += `
        AND c.c_id = ${category}
      `
    } else {
      sql += `
        WHERE c.c_id = ${category}
      `
    }
    valid = true
  }

  if (!p_type.includes('상품타입')) {
    if (valid) {
      sql += `
        AND p.p_type = ${p_type}
      `
    } else {
      sql += `
        WHERE p.p_type = ${p_type}
      `
    }
    valid = true
  }

  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      connection.query(sql, [], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const selectLatestLimit6 = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          p_id, p_name, p_price, p_image, p_type, p_reg_date
        FROM
          products
        ORDER BY
          p_reg_date DESC
        LIMIT 6
      `

      connection.query(sql, [], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const selectPopularLimit6 = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          p.*, sum(od.p_quantity) AS p_order_count
        FROM
          products AS p
        LEFT OUTER JOIN
          orderDetails AS od
          ON
            p.p_id = od.p_id
        GROUP BY
          p.p_id
        ORDER BY
          p_order_count DESC
        LIMIT 6
      `

      connection.query(sql, [], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
      connection.release()
    })
  })
}

const selectBrandProduct = async b_id => {
  return new Promise((resolve, reject) => {
    pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)

      const sql = `
        SELECT
          *
        FROM
          products
        WHERE
          b_id = ?
      `

      connection.query(sql, [b_id], (queryError, rows) => {
        if (queryError) reject(queryError)

        resolve(rows)
      })
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
  selectProductLike,
  selectProductUserLike,
  insertProductLike,
  updateProductLikeOn,
  updateProductLikeOff,
  insertProductReview,
  updateProductReview,
  deleteProductReview,
  selectBrandList,
  selectcategoryList,
  productOrderbyPopular,
  productOrderbyReview,
  productOrderbyName,
  productFilter,
  selectLatestLimit6,
  selectPopularLimit6,
  selectBrandProduct,
}