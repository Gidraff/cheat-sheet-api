const userController = require('../controllers/user.controller')
const authValidator = require('../validators/auth.middleware')
const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports = (app) => {
  app.post('/api/user/register', authValidator.validateAuth, userController.register)
  app.post('/api/user/login', authValidator.validateAuth, userController.login)
}
