require('dotenv').load()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/config')
const app = express()

// connect to the db
mongoose.connect(config.url)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(
  console, 'Failed to connect to db...'))
db.once('open', function callback() {
  console.log('Successfully connected to db...')
})

// set middleware
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', async(req, res) => res.send('It works'))

require('./routes/user.routes')(app)

module.exports = app
