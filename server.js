require('dotenv').load()
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dbConfig = require('./config/db.config')
const app = express()
const port = process.env.PORT || 3000

// connect to the db
mongoose.connect(dbConfig.development.url)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('errror', console.error.bind(
  console, 'Failed to connect to db...')
)
db.once('open', function callback() {
  console.log('Successfully connected to db...')
})

// set middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.get('/', (req, res) => res.send('It works'))

require('./routes/user.routes')(app)
app.listen(port, () => console.log(`listening on http://localhost:${port}`))
