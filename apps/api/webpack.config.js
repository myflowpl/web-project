const { NxAppWebpackPlugin, NxWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/api'),
  },
  plugins: [
    // new NxAppWebpackPlugin({
    //   target: 'node',
    //   compiler: 'tsc',
    //   main: './src/main.ts',
    //   tsConfig: './tsconfig.app.json',
    //   assets: ['./src/assets'],
    //   optimization: false,
    //   outputHashing: 'none',
    //   transformers: [{ name: '@nestjs/swagger/plugin' }], // <-- ADD the following line
    // }),
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
};
