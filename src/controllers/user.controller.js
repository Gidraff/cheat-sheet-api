const passport = require('passport')
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
  passport.authenticate('signup', async (err, user, info) => {
    try {
      if(err || !user) {
        return res.status(409).json(info)
      }
      req.login(user, {session: false}, async (error) => {
        if(error) return next(error)
        return res.status(201).send({
          message: 'Account was successfully created',
          user
        })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
}

exports.login = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(400).json({
          message: info
        })
      }
      req.login(user, {session: false}, (err) => {
        if (err) {
          res.send(err)
        }

        const token = jwt.sign({ id: user.id, email: user.username}, process.env.SECRET)
        return res.json({user: user.email, token})
      })
    } catch (e) {
      return next(e)
    }

  })(req, res)
}
