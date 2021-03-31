const path = require('path');
const BabelMinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
    extensions: ['.ts', '.tsx', '.js']
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8080,
    historyApiFallback: true, // これがないとルーティングできない
  },
  entry: './src/index.tsx', // 読み込むファイル
  output: {
    path: path.resolve(__dirname, 'build'), //アウトプット先
    filename: 'bundle.js' //アウトプットするファイル名
  },
  plugins: [
    new BabelMinifyPlugin(),
  ],
};
