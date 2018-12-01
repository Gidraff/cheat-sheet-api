const User = require('../models/user.model')
const { isEmailValid, isPasswordValid } = require('../lib/user.lib')


exports.register = async (req, res) => {
  if (!isEmailValid(req.body)) {
    return res.status(400).send({
      error: 'Invalid Email. Try again.'
    })
  }
  if (!isPasswordValid(req.body)) {
    return res.status(400).send({
      error: 'Invalid password.'
    })
  }

  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(409).json({
      error: 'Email already taken.'
    })
  } else {
    user = new User(req.body)
    const newUser = await user.save()
    if (newUser) {
      return res.json({
        message: 'Account was created.'
      })
    }

  }
}
