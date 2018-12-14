const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user.model')
const randomstring = require('randomstring')
const mailer = require('../misc/mailer')

// Extract and verifies the token sent is valid
passport.use('jwt', new JwtStrategy({
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
  try {
    return done(null, token)
  } catch (error) {
    done(error)
  }
}))

passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    let user = await User.findOne({ email })
    if (user) {
      return done(null, false, {
        message: 'Email already taken'
      })
    } else {
      // const secretToken = randomstring.generate()
      user = await User.create(req.body)
      // user.active = false
      // user.secretToken = secretToken
      // await user.save()

      // const html = `
      //   Hi there, <br/> Thank you for registering! <br/>
      //   Please verify your email by typing the following:
      //   Token: <b>${secretToken}</b>
      //   click: goto http://${req.headers.host}/user/verify
      // `
      // const response = await mailer.sendMail('raff@admin', email, 'Please verify your email', html)
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
      return done(null, false, { success: false, message: 'User not found. Please Sign Up to proceed'})
    }
    // if(!user.active){
    //   return done(null, false, { success: false, message: 'You need to verify email first'})
    // }

    const validate = await user.isValidPassword(password)
    if (!validate) {
      return done(null, false, { message: 'Wrong Password'})
    }
    return done(null, user, { message: 'Logged in Successfully'})
  } catch (error) {
    return done(error)
  }
}))
