module.exports = {
  parser: 'babel-eslint',
  env: {
    'browser': true,
    'es6': true,
    'jquery': true
  },
  extends: [
    'react-app',
    '@strv/javascript/environments/react/v16',
    '@strv/javascript/environments/react/optional',
    '@strv/javascript/coding-styles/recommended'
  ],
  parserOptions: {
    'sourceType': 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-shadow': 0
  }
};
