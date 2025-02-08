module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        ['module-resolver', {
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@assets': './src/assets',
          },
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
          ],
          root: ['.'],
        }],
      ],
    };
  };