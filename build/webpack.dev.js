const webpack = require('webpack');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const StringReplacePlugin = require("string-replace-webpack-plugin");

const root = require('./helpers').root;
const VERSION = JSON.stringify(require('../package.json').version);
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js');

const SERVERURI = 'http://localhost:8080';
const AUTH0OPTIONS = {
  clientId: 'jNn1V2ORu1rN1TzgEv1SvDldgnz18W0Y',
  domain: 'anjanikumar2109.auth0.com'
};

module.exports = webpackMerge(commonConfig({
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  SERVERURI:SERVERURI,
  AUTH0OPTIONS:AUTH0OPTIONS,
  AOT: false
}), {
  devtool: '#inline-source-map',
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'portal': './src/index.ts',
  },
  devServer: {
    contentBase: root('app'),
    watchContentBase: true,
    compress: true,
    watchOptions: {
      poll: true
    },
    port: 4000,
    hot: false,
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'awesome-typescript-loader?{configFileName: "tsconfig.webpack.json"}',
          'angular2-template-loader',
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills'],
      minChunks: Infinity
    })
  ]
})
