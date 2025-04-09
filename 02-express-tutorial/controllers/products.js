const { products } = require('../data')
  

const getProductById = (req, res) => {
  const idToFind = Number(req.params.productID)

  const product = products.find(
    (product) => product.id === idToFind
  )
  if (!product) {
    return res.status(404).send(`Product with id = ${req.params.productID} was not found`)
  }

  return res.json(product)
}

const getProducts = (req, res) => {
  const { name, maxPrice, limit  } = req.query
  let filteredProducts = [...products]

  if (name) {
    filteredProducts = filteredProducts.filter(product =>
      // product.name.startsWith(name)
      product.name.toLowerCase().includes(name.toLowerCase())
    )
  }
  if (maxPrice && Number(maxPrice) >= 0) {
    filteredProducts = filteredProducts.filter(product =>
      product.price <= Number(maxPrice)
    )
  }
  if (limit && Number(limit) >= 0) {
    filteredProducts = filteredProducts.slice(0, Number(limit))
  }

  if (filteredProducts.length === 0) {
    return res.status(200).json({ success: true, data: [] })
  }

  res.status(200).json({ success: true, data: filteredProducts })
}

module.exports = {
  getProducts,
  getProductById,
}