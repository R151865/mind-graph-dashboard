module.exports = {
    preset: 'ts-jest',       // Use ts-jest preset
    testEnvironment: 'jsdom', // Environment for React tests
    collectCoverage: true,   // Enable coverage collection
    collectCoverageFrom: [
      "src/components/*.ts",
      "src/components/*.tsx",
      "!src/components/*.test.ts",
      "!src/components/*.test.tsx",
      "!src/components/index.ts"
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
  