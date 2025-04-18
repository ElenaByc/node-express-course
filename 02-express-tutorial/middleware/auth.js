const auth = (req, res, next) => {
  const { name } = req.cookies
  if (!name) {
    return res.status(401).json({ msg: 'unauthorized' })
  }
  req.user = name
  next()
}
module.exports = auth