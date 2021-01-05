/* eslint linebreak-style: [2, "unix"] */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: ['error', 'always'],
    'linebreak-style': ['error', 'windows'],
    camelcase: [0, { properties: 'always' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/static-property-placement': [0, 'static public field'],
    'react/state-in-constructor': [2, 'never'],
    'react/jsx-props-no-spreading': [0, { explicitSpread: 'ignore' }],
  },
};
