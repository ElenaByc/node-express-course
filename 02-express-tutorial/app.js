const express = require('express')
const cookieParser = require('cookie-parser')
const peopleRouter = require('./routes/people')
const productsRouter = require('./routes/products')
const logger = require('./middleware/logger')
const auth = require('./middleware/auth')

const app = express()
const port = 3000

app.use(express.static('./methods-public'))
app.use(logger)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/people', peopleRouter)
app.use('/api/v1/products', productsRouter)

app.post('/logon', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ msg: 'please provide name value' })
  }
  res.cookie('name', name)
  res.status(201).send(`Hello ${name}`)
})

app.delete('/logoff', (req, res) => {
  res.clearCookie('name')
  res.status(200).json({ msg: 'user logged off' })
})

app.get('/test', auth, (req, res) => {
  res.status(200).json({ msg: `Welcome ${req.user}` })
})

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
