// webpack.config.js
const path = require('path');

module.exports = {
  entry: './chordbox.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'chords', // 导出库为全局变量 chords
    libraryTarget: 'umd' // 支持多种模块系统
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
  }
};
