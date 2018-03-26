var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'docs': path.join(__dirname, 'docs/js/docs.js')
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
    ]
  },
  devtool: 'sourcemap',
  debug: true,
  output: {
    path: path.join(__dirname, 'docs/js'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.bundle\.js$/,
      compress: false
    })
  ],
  resolve: {
    alias: { vue: 'vue/dist/vue.common.js' }
  }
}
