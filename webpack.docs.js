const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    'docs': path.join(__dirname, 'docs/js/docs.js')
  },
  output: {
    path: path.join(__dirname, 'docs/js'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
  },
  resolve: {
    alias: { vue: 'vue/dist/vue.common.js' }
  },
  optimization: {
    minimize: true
  }
});
