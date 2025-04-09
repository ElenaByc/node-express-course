const express = require('express')
const peopleRouter = require('./routes/people')
const productsRouter = require('./routes/products')
const logger = require('./middleware/logger')

const app = express()
const port = 3000

app.use(express.static('./methods-public'))
app.use(logger)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/v1/people', peopleRouter)
app.use('/api/v1/products', productsRouter)

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
