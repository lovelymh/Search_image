module.exports = {

    entry: ['babel-polyfill', './src/index.js'],

    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },

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
