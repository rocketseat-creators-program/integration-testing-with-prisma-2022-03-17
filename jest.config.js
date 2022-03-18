export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './jest.global-setup.js',
  globalTeardown: './jest.global-teardown.js'
}