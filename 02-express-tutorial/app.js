const express = require('express')
const { products } = require('./data')

const app = express()
const port = 3000

app.use(express.static('./public'))


app.get('/api/v1/test', (req, res) => {
  res.json({ message: "It worked!" })
})

app.get('/api/v1/products/', (req, res) => {
  res.json(products)
})

app.get('/api/v1/products/:productID', (req, res) => {
  const idToFind = Number(req.params.productID)

  const product = products.find(
    (product) => product.id === idToFind
  )
  if (!product) {
    return res.status(404).send(`Product with id = ${req.params.productID} was not found`)
  }

  return res.json(product)
})

app.get('/api/v1/query', (req, res) => {

  const { name, price, limit } = req.query
  let filteredProducts = [...products]

  if (name) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.startsWith(name)
    )
  }
  if (price && Number(price) >= 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.price <= Number(price)
    )
  }
  if (limit && Number(limit) >= 0) {
    filteredProducts = filteredProducts.slice(0, Number(limit))
  }
  if (filteredProducts.length === 0) {
    return res.status(200).json({ success: true, data: [] })
  }
  res.status(200).json(filteredProducts)
})

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
