require('dotenv').config({ path: '.env.test' });

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'ts'],

  roots: ['<rootDir>/src'],

  testMatch: ['**/__tests__/**/*.[jt]s', '**/?(*.)+(spec|test).[jt]s'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
