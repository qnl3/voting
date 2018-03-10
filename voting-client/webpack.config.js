module.exports = {
    entry: [
        './src/index.js',
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    output: {
        path: _dirname + '/dist',
        publicPath: '/',
        filename: bundle.js,
    },
    devServer: {
        contentBase: './dist'
    }
}