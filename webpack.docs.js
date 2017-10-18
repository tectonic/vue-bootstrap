var path = require('path');

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
  resolve: {
    alias: { vue: 'vue/dist/vue.common.js' }
  }
}
