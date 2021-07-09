/*
 * File: jest.config.ts
 * Project: type-node
 * Created: Thursday, March 11th 2021, 5:12:43 pm
 * Last Modified: Friday, July 9th 2021, 3:42:08 pm
 * Copyright © 2021 AMDE Agência
 */

module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*.protocols.ts',
    '!**/interfaces/**',
    '!**/test/**'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  roots: ['<rootDir>/src'],
  coverageProvider: 'babel'
}
