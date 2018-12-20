require('dotenv').load()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/config')
const app = express()
const expressValidator = require('express-validator')

// connect to the db
mongoose.connect(config.url, {useNewUrlParser: true})
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(
  console, 'Failed to connect to db...'))
db.once('open', function callback() {
  console.log('Successfully connected to db.')
})
require('./auth/auth')
// set middleware
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.get('/', async (req, res) => res.send('It works'))

require('./routes/user.routes')(app)
require('./routes/cheatsheet.routes')(app)
require('./routes/command.routes')(app)


module.exports = app
