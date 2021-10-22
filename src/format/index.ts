import * as moment from 'moment'

export const formatDate = date => {
  return moment(date).format('YYYY-MM-DD')
}

export const formatPrice = price => {
  return price.toLocaleString()
}

export const formatProductInfo = products => {
  if (Array.isArray(products)) {
    return products.map(_product => {
      const product = _product

      product.price = formatPrice(product.price)
      product.registrationDate = formatDate(product.registrationDate)

      return product
    })
  }

  const product = products

  product.price = formatPrice(product.price)
  product.registrationDate = formatDate(product.registrationDate)

  return product
}
