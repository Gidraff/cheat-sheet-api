const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate')

const CommandSchema = Schema({
  description: {
    type: String,
    unique: true,
    require: true,
    trim: true
  },
  command: {
    type: String,
    unique: true,
    require: true,
    trim: true
  },
  cheatId: {
    type: Schema.Types.ObjectId,
    ref: 'CheatSheet'
  }
})
CommandSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Command', CommandSchema)
