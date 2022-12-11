/*
 * File: jest-mongodb.config.js
 * Project: type-node
 * Created: Sunday, December 11th 2022, 6:47:30 am
 * Last Modified: Sunday, December 11th 2022, 7:23:05 am
 * Copyright © 2022 AMDE Agência
 */

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
