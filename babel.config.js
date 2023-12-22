module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '^~(.+)': './\\1',
          '^~/pages/(.+)': './e2e/pages/\\1',
          '^~/assertions/(.+)': './e2e/assertions/\\1',
          '^~/fixtures/(.+)': './e2e/fixtures/\\1',
          '^~/testutils/(.+)': './e2e/utils/\\1',
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js',
        ],
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'], //removing consoles.log from app during release (production) versions
    },
  },
};
