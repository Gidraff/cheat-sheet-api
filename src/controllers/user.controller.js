const passport = require('passport')
const User = require('../models/user.model')
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
          success: true,
          message: 'Account was successfully created'
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

        const token = jwt.sign({
          id: user.id, username: user.username
        }, process.env.SECRET)
        return res.json({user: user.email, token})
      })
    } catch (e) {
      return next(e)
    }

  })(req, res, next)
}

// exports.verify = async (req, res, next) => {
//   try {
//     const {secretToken} = req.body
//     if(secretToken.trim().length > 0) {
//       const user = await User.findOne({ 'secretToken': secretToken})
//       console.log('user ===>', user)
//       if(!user) {
//         return res.status(401).json({
//           success: false,
//           message: 'User not found'
//         })
//       }
//
//       user.active = true
//       user.secretToken = ''
//       await user.save()
//       res.json({
//         success: true,
//         message: 'Account verified'
//       })
//       next()
//     }
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid token'
//     })
//
//
//   } catch (e) {
//     next(e)
//   }
// }
