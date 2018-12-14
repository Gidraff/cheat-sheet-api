const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate')

const CheatSheetSchema = Schema({
  title: {
    type: String,
    require: true,
    trim: true
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
  commands: [{ type: Schema.Types.ObjectId, ref: 'Command'}],
})

CheatSheetSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('CheatSheet', CheatSheetSchema)
