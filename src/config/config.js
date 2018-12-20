const getEnv = () => {
  switch (process.env.NODE_ENV) {
  case 'development':
    return {url: 'mongodb://localhost:27017/cheatsheet'}
  case 'testing':
    return {url: 'mongodb://localhost:27017/cheatsheet_testdb'}
  case 'production':
    return {
      name: 'MongoDB Service',
      url: 'mongodb://cheat123:cheat123@mern-cluster1-shard-00-00-lggts.gcp.mongodb.net:27017,mern-cluster1-shard-00-01-lggts.gcp.mongodb.net:27017,mern-cluster1-shard-00-02-lggts.gcp.mongodb.net:27017/test?ssl=true&replicaSet=mern-cluster1-shard-0&authSource=admin&retryWrites=true',
      port: process.env.MONGODB_PORT
    }
  default:
    return {url: 'mongodb://localhost:27017/cheatsheet'}

  }
}

module.exports = getEnv()
