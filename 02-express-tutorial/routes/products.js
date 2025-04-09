const express = require('express')
const router = express.Router()
const { 
  getProducts,
  getProductById,
 } = require('../controllers/products.js')

router.route('/').get(getProducts)
router.route('/:productID').get(getProductById)

module.exports = router