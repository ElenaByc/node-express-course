const Product = require('../models/Product')


const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } }).sort('price').select('name price')
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  console.log('req.query:', req.query)
  const { featured, company, name, sort, fields, numericFilters } = req.query
  const queryObject = {}

  if (featured) {
    queryObject.featured = featured === 'true'
  }
  if (company) {
    queryObject.company = company
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }

  if (numericFilters) {
    console.log('numericFilters:', numericFilters)
    const operatorMap = {
      '>': '$gt',
      '<': '$lt',
      '=': '$eq',
      '>=': '$gte',
      '<=': '$lte',
    }

    operatorRegex = /\b(>|<|=|>=|<=)\b/g
    let filters = numericFilters.replace(
      operatorRegex,
      (match) => `-${operatorMap[match]}-`
    )
    console.log('filters:', filters)

    const options = ['price', 'rating']
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    })
  }

  console.log('queryObject:', queryObject)
  let result = Product.find(queryObject)

  if (sort) {
    console.log('sort:', sort)
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10

  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)

  const products = await result
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
  getAllProductsStatic,
  getAllProducts,
}