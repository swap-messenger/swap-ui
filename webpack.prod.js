const path = require('path');
const webpack = require('webpack');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
module.exports = {
  entry: ['./src/index.ts'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
   
  },
  cache:true,
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias:{
      src: path.resolve('./src'),
      assets:  path.resolve('./assets')
    }
  },
  module: {
    rules:[
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        exclude: /(node_modules)/,
    },
    {
      test: /\.(ts|tsx)$/,
      // include: path.resolve(__dirname, 'src'),
      use:[
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        }
      ]
    },
    {
      test: /\.svg$/,
      loader: 'svg-inline-loader'
    },
    {
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          options:{
            data: `@import "variables";`,
            includePaths:[
              path.resolve(__dirname, "src")
            ]
          }
        }
      ]
    },{
      test: /\.(png|jpe?g)$/,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug:true,
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
          }
        },
      ]
    },{
      test: /\.otf$/,
      loader: 'url-loader?limit=100000'
    }
  ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'PRODUCTION': true,
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};