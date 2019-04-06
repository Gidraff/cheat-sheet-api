const userController = require('../controllers/user.controller')
const {validateAuth, validateLogin} = require('../validators/inputValidator.middleware')
// const passport = require('passport')

module.exports = (app) => {
  app.post('/api/user/register', validateAuth, userController.register)
  app.post('/api/user/login', validateLogin, userController.login)
  // app.post('/api/user/verify', userController.verify)
}
