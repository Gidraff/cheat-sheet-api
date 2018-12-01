const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  email: {
    type: String,
    unique: true,
    require: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConf: {
    type: String,
    required: true,
  }
})


module.exports = mongoose.model('User', UserSchema)
