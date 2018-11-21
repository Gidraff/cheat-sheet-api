const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  username: {
    type: String,
    unique: true,
    require: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    require: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }

})
module.exports = mongoose.model('User', UserSchema)
