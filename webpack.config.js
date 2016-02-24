var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var AppCachePlugin = require('appcache-webpack-plugin');
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var autoprefixer = require( 'autoprefixer' );

module.exports = {
    context: __dirname,

    entry: './assets/js/app', 

    output: {
        path: path.resolve('./assets/bundles/'),
        filename: "[name]-[hash].js",
    },

    devtool: 'source-map',

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new AppCachePlugin({
            output: 'manifest.appcache'
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
        }),
        new webpack.optimize.UglifyJsPlugin({
            'compress': {
                'warnings': false,    
            },
            'screw-ie8': true,
            'no-copyright': true,
        }),
        new ExtractTextPlugin( '[name]-[hash].css' ),
    ],

    module: {
        loaders: [
            { test: /\.scss$/, 
              exclude: /node_modules/, 
              loader: ExtractTextPlugin.extract( 'style', 'css!resolve-url!sass?sourceMap!postcss' ),
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
            { test: /\.html$/,
              exclude: /node_modules/,
              loader: 'raw'
            }
        ],
    },
    postcss: [
        autoprefixer({
            'browsers': [ 'last 2 versions' ],
            'remove': false,
        }),
    ],

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.html']
    },
};
