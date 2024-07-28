module.exports = {
    preset: 'ts-jest',       // Use ts-jest preset
    testEnvironment: 'jsdom', // Environment for React tests
    collectCoverage: true,   // Enable coverage collection
    collectCoverageFrom: [
      "src/components/**/*.ts",  // Include all TypeScript files in src/components
      "src/components/**/*.tsx", // Include all TypeScript JSX files in src/components
      "!src/components/**/*.test.ts",  // Exclude test files in src/components
      "!src/components/**/*.test.tsx", // Exclude test files in src/components
      "!src/components/**/index.ts",  // Exclude index files in src/componentsf
      "!src/components/**/index.tsx"  // Exclude index files in src/components
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
  