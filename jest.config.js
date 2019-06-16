module.exports = {
  transform: {
    "^.+\\.tsx?|ts?$": `ts-jest`,
    "^.+\\.js?$": `babel-jest`
  },
  testRegex: `.test.(js?|jsx?|tsx?|ts?)$`,
  moduleFileExtensions: [`ts`, `tsx`, `js`, `jsx`, `json`, `node`]
};
