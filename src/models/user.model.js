const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = Schema({
  username: {
    type: String,
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
  },
  active: Boolean,
  secretToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  cheats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CheatSheet'
    }
  ]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

UserSchema.pre('save', async function(next) {
  try {
    if(this.isModified('password')) {
      const user = this
      const hash = await bcrypt.hash(this.password, 10)
      user.password = hash
    }
    next()
  } catch (e) {
    next(e)
  }
})

UserSchema.methods.isValidPassword = async function(password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)
  return compare
}

module.exports = mongoose.model('User', UserSchema)
