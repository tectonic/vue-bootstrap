const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

process.env.NODE_ENV = 'production';

module.exports = merge(common, {
  mode: 'production',
  entry: {
    'dist': path.join(__dirname, 'src/index.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'vue-bootstrap.js',
    sourceMapFilename: 'vue-bootstrap.map',
    libraryTarget: 'commonjs'
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
});
