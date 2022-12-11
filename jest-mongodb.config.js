module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.0.3', // make atention to the production version of the db
      skipMD5: true
    },
    instance: {
      dbName: 'jest'
    },
    autoStart: false
  }
}
