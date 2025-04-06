const express = require('express')
const { products, people } = require('./data')

const app = express()
const port = 3000

const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const time = new Date().getFullYear()
  console.log(method, url, time)
  next()
}


app.use(express.static('./methods-public'))
app.use(logger)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/api/v1/test', (req, res) => {
  res.json({ message: 'It worked!' })
})

app.get('/api/v1/people/', (req, res) => {
  res.json(people)
})

app.post('/api/v1/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a name' })
  }
  people.push({ id: people.length + 1, name: name })
  res.status(201).json({ success: true, name: name })
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
