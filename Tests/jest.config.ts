import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "..",
  testMatch: ["<rootDir>/Tests/src/**/*.test.ts"],
  moduleNameMapper: {
    "^@proodos/domain/(.*)$": "<rootDir>/Domain/src/$1",
    "^@proodos/application/(.*)$": "<rootDir>/Application/src/$1",
    "^@proodos/infrastructure/(.*)$": "<rootDir>/Infrastructure/src/$1",
    "^@proodos/api/(.*)$": "<rootDir>/API/src/$1"
  },
  collectCoverageFrom: [
    "<rootDir>/Application/src/**/*.ts",
    "<rootDir>/Domain/src/**/*.ts",
    "!**/*.d.ts"
  ],
  coverageDirectory: "<rootDir>/Tests/coverage",
  coverageReporters: ["text", "html", "lcov"]
};

export default config;
