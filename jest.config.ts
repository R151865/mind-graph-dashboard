module.exports = {
    preset: 'ts-jest',       // Use ts-jest preset
    testEnvironment: 'jsdom', // Environment for React tests
    collectCoverage: true,   // Enable coverage collection
    collectCoverageFrom: [
      "src/**/*.ts",
      "src/**/*.tsx",
      "!src/**/*.test.ts",
      "!src/**/*.test.tsx",
      "!src/**/index.ts"
    ],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest" // Transform TypeScript files using ts-jest
    }
  };
  