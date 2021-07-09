/*
 * File: jest-unit.config.js
 * Project: type-node
 * Created: Friday, July 9th 2021, 3:27:04 pm
 * Last Modified: Friday, July 9th 2021, 3:31:04 pm
 * Copyright © 2021 AMDE Agência
 */

const config = require('./jest.config.ts')
config.testMatch = ['**/*.spec.ts']
module.exports = config
