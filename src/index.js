const app = require('./server')

app.listen(process.env.PORT, () => {
  console.log(`Running on ${process.env.NODE_ENV} mode on port:${process.env.PORT}`)
})
