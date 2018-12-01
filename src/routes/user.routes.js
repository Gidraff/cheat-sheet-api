const userController = require('../controllers/user.controller')

module.exports = (app) => {
  app.post('/api/user/register', userController.register)
}
