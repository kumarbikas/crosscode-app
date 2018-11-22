var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './index.js',
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: './built/bundle.js'
    },
   /* module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }
        ]
    }*/
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, ".")
                ],
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { 
            	test: /\.json$/, loader: 'json-loader' 
            }
        ]
    }
};