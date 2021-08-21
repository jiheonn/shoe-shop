import moment from 'moment'

const dateFormat = date => {
  return moment(date).format('YYYY-MM-DD')
}

const priceFormat = price => {
  return price.toLocaleString()
}

const typeFormat = type => {
  let p_type

  if (type === 0) {
    p_type = '남녀공용'
  } else if (type === 1) {
    p_type = '남성용'
  } else {
    p_type = '여성용'
  }

  return p_type
}

const productInfoFormat = productList => {
  return productList.map(_product => {
    const product = _product

    product.p_price = priceFormat(product.p_price)
    product.p_reg_date = dateFormat(product.p_reg_date)
    product.p_type = typeFormat(product.p_type)

    return product
  })
}

export default {
  productInfoFormat,
}
