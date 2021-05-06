/*
 * File: jest.config.ts
 * Project: type-node
 * Created: Thursday, March 11th 2021, 5:12:43 pm
 * Last Modified: Thursday, May 6th 2021, 11:07:12 am
 * Copyright © 2021 AMDE Agência
 */

module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  roots: ['<rootDir>/src']
}
