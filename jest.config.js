module.exports = {
  "roots": [
    "<rootDir>/ts",
    "<rootDir>/js"
  ],
  "testMatch": [
    "**/test/**/!(*.d).+(ts|tsx|js)",
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
}