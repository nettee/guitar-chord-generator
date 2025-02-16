// webpack.config.js
const path = require('path');

module.exports = {
  entry: './chordbox.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'module' // 使用 ES6 模块
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  experiments: {
    outputModule: true // 启用 ES6 模块输出
  }
};
