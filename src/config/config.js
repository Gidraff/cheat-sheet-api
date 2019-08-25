const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return { url: 'mongodb://localhost:27017/cheatsheet' }
    case 'testing':
      return { url: 'mongodb://localhost:27017/cheatsheet_testdb' }
    case 'production':
      return {
        name: 'MongoDB Service',
        url: 'mongodb+srv://dbCheatSheetUser:dbCheatSheetUser@mern-cluster1-lggts.gcp.mongodb.net/test?retryWrites=true&w=majority',
        port: process.env.MONGODB_PORT
      }
    default:
      return { url: 'mongodb://localhost:27017/cheatsheet' }

  }
}

module.exports = getEnv()
