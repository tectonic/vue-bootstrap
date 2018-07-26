const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: {
    'docs': path.join(__dirname, 'docs/js/docs.js')
  },
  output: {
    path: path.join(__dirname, 'docs/js'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: { vue: 'vue/dist/vue.common.js' }
  },
  devtool: 'source-map',
  optimization: {
    minimize: true
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
