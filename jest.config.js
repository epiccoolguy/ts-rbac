/** @type {import('jest').Config} */
const config = {
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

export default config;
