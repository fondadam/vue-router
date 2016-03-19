var path = require('path'),
    webpack = require('webpack'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

// path
var ROOT_PATH = path.resolve(__dirname),
    SRC_PATH = path.resolve(ROOT_PATH, 'src'),
    BUILD_PATH = path.resolve(ROOT_PATH, 'dist'),
    TPL_PATH = path.resolve(SRC_PATH, 'templates');

// banner info
var pkg = require('./package.json');
var banner = pkg.name + " " + pkg.version +
            "\n" + new Date().toLocaleDateString() + " " + pkg.author +
            "\n" + pkg.homepage;

module.exports = {
    entry: {
        app: path.resolve(SRC_PATH, 'index.js'),
        vendors: ['vue', 'vue-router', 'es6-promise']
    },
    output: {
        path: BUILD_PATH,
        publicPath: './',
        filename: '[name].js',
        chunkFilename: '[chunkhash:8].js'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'vue-router-demo',
            template: path.resolve(TPL_PATH, 'index.html'),
            filename: 'index.html'
        }),
        //把指定文件夹下的文件复制到指定的目录
        new CopyWebpackPlugin([{
            from: 'src/asserts/imgs',
            to: 'imgs'
          },{
            from: 'favicon.ico',
            to: '.'
          },
        ])
    ],
    vue: {
        autoprefixer: {
          browsers: ['> 1%']
        },
        loaders: {
          css: 'vue-style!css',
          sass: 'vue-style!css!sass'
        },
    },
    babel: {
        presets: ["es2015", "stage-2"],
        plugins: ["transform-runtime"],
        comments: false
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        stats: { colors: true },
        host: '0.0.0.0'
    },
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.BannerPlugin(banner),
    ])
} else {
  module.exports.devtool = '#source-map'
}
