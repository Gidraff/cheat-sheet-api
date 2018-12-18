const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const User = require('../models/user.model')

passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    let user = await User.findOne({ email })
    if (user) {
      return done(null, false, {
        message: 'Email already taken'
      })
    } else {
      user = await User.create({ email, password})
      return done(null, user)
    }
  } catch (error) {
    return done(error)
  }
}))

passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return done(null, false, { status_code: 401, message: 'User not found. Please Sign Up to proceed'})
    }

    const validate = await user.isValidPassword(password)
    if (!validate) {
      return done(null, false, { message: 'Wrong Password'})
    }
    return done(null, user, { message: 'Logged in Successfully'})
  } catch (error) {
    return done(error)
  }
}))
