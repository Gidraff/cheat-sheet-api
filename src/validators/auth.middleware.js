const _ = require('lodash')

exports.validateAuth = (req, res, next) => {
  // checks if req.body is valid
  req.checkBody('email', 'Invalid Email').notEmpty().isEmail()
  req.checkBody('password', 'Invalid Password').notEmpty().trim().isLength({min: 6})

  const errors = req.validationErrors()
  if (errors && errors.length > 0) {
    const response = _.uniqBy(errors, 'msg')
    res.statusCode = 400
    return res.json(response)
  }
  return next()
}
