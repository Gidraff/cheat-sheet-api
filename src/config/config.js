const getEnv = () => {
  switch (process.env.NODE_ENV) {
  case 'development':
    return { url: 'mongodb://localhost:27017/cheatsheet' }
  case 'testing':
    return { url: 'mongodb://localhost:27017/cheatsheet_testdb' }
  case 'production':
    return {
      name: 'MongoDB Service',
      url: 'mongodb://' + process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWORD + '@' + process.env.MONGODB_HOST + '/' + process.env.MONGODB_DATABASE,
      port: process.env.MONGODB_PORT
    }
  default:
    return { url: 'mongodb://localhost:27017/cheatsheet' }

  }
}

module.exports = getEnv()
