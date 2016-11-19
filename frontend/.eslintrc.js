module.exports = {
  parserOptions: {
    sourceType: 'script'
  },
  env: {
    browser: true,
  },
  rules: {
    strict: [2, 'global'],
    'prefer-arrow-callback': 0,
    'no-var': 0,
    'vars-on-top': 0,
  },
  globals: {
    angular: false
  }
};
