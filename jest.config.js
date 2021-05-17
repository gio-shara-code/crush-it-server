module.exports = {
  roots: ["./src"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testEnvironment: "node",
  testTimeout: 30000,
  modulePathIgnorePatterns: ["__tests__/mocks"]
  // globalSetup: "__tests__/setup.ts"
}
