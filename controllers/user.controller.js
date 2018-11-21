const User = require('../models/user.model')

exports.register = (req, res) => {
  if(req.body){
    console.log('body', req.body)
  }
}
