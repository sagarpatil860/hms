module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@api/(.*)$": "<rootDir>/src/api/$1",
    "^@auth/(.*)$": "<rootDir>/src/auth/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@routing/(.*)$": "<rootDir>/src/routing/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@shared-types/(.*)$": "<rootDir>/src/shared-types/$1",
  },
  moduleDirectories: ["node_modules", "src"], // so bare imports work too
};
