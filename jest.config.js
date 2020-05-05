module.exports = {
  "roots": [
    "<rootDir>/ts",
    "<rootDir>/js"
  ],
  "testMatch": [
    "**/test/**/!(*.d).+(ts|tsx|js)",
  ],
  "transform": {
    ".+\.js$": "babel-jest",
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
}