var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,

    entry: './assets/js/app', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs

    output: {
        path: path.resolve('./assets/bundles/'),
        filename: "[name]-[hash].js",
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
    ],

    module: {
        loaders: [
            { test: /\.scss$/, 
              exclude: /node_modules/, 
              loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap']
            },
            { test: /\.woff$/, 
              exclude: /node_modules/, 
              loader: 'url?limit=100000&mimetype=application/font-woff' 
            },
            { test: /\.ttf$/,
              exclude: /node_modules/,
              loader: 'file'
            },
            { test: /\.svg$/,
              exclude: /node_modules/,
              loader: 'file'
            },
            { test: /\.eot$/,
              exclude: /node_modules/,
              loader: 'file'
            },
        ],
    },

    resolve: {
        modulesDirectories: ['node_modules', 'components/bower_components'],
        extensions: ['', '.js', '.jsx']
    },
};
