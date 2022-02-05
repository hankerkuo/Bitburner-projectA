/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // !!This is important for jest module mapping!!
  moduleNameMapper: {
    '^/(.*)$': '<rootDir>/src/$1',
  },
};