const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const requestTime = new Date().toLocaleString()

  console.log(method, url, requestTime)
  next()
}

module.exports = logger