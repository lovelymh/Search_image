const webpack = require('webpack');
module.exports = {

    entry: ['babel-polyfill', './src/index.js'],

    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ //공백을 제거함
          compressor: {
            warnings: false,
          },
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
               test: /\.css$/,
               loaders: ['style-loader', 'css-loader']
            }
        ]
    }
};
