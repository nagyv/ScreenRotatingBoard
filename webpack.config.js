var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')


var config = {
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loaders: ['babel-loader'], 
        exclude: /node_modules/ 
      }
    ]
  },
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      title: 'Fontanus Screens',
      appMountId: 'content',
      template: __dirname + '/src/index.html',
      window: {
        ScreenRotatingBoardConfig: {
          wrapper: 'content',
          screens: [
            {
              type: 'image',
              timeOut: 15000,
              src: 'https://picsum.photos/200/300/?random'
            },
            {
              type: 'youtube',
              videoId: 'RevmZ_8vmq4'
            },
            {
              type: 'html',
              src: 'http://www.fontanus.hu',
              timeOut: 15000
            }
          ]
        }
      }
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = config;
