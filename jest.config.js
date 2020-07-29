module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/pages/_document.tsx',
    '!**/*.d.ts',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: './tests/tsconfig.json',
    },
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
};
