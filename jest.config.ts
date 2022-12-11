/*
 * File: jest.config.ts
 * Project: type-node
 * Created: Thursday, March 11th 2021, 5:12:43 pm
 * Last Modified: Sunday, December 11th 2022, 6:46:53 am
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
  coverageProvider: 'babel',
  roots: ['<rootDir>/src'],
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
}
