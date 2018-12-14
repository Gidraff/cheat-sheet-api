const _ = require('lodash')

exports.validateAuth = (req, res, next) => {
  // checks if req.body is valid
  req.checkBody('username', 'Invalid Username').notEmpty().trim().isLength({ min: 5})
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

exports.validateLogin = (req, res, next) => {
  // checks if req.body is valid
  req.checkBody('email', 'Invalid Email').notEmpty().isEmail()
  req.checkBody('password', 'Invalid Password').notEmpty().trim().isLength({min: 6})

  const errors = req.validationErrors()
  if (errors && errors.length > 0) {
    const response = _.uniqBy(errors, 'msg')
    res.statusCode = 400
    return res.json({
      success: false,
      response
    })
  }
  return next()
}

exports.validateCheat = (req, res, next) => {
  req.checkBody('title', 'The Title is not valid').notEmpty().trim().isLength({ min: 5})
  const errors = req.validationErrors()
  if (errors && errors.length > 0) {
    const response = _.uniqBy(errors, 'msg')
    res.statusCode = 400
    return res.json(response)
  }
  return next()
}
