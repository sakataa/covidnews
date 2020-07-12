const path = require('path');
const webpack = require("webpack");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");

const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const cleanOptions = {
  verbose: true,
  dry: false,
  cleanOnceBeforeBuildPatterns: ["**/*"]
};

module.exports = env => {
  const isPro = env === 'production';

  return {
    mode: isPro ? 'production' : 'development',
    devtool: isPro ? '' : 'source-maps',
    entry: {
      'resourcesLanguage': './src/js/resources/index.js',
      'app': './src/js/index.jsx',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash].bundle.js',
      publicPath: "",
      chunkFilename: '[name].[chunkhash].bundle.js'
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      }]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": isPro ? '"production"' : '"development"'
      }),
      new BundleAnalyzerPlugin({openAnalyzer: false}),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: './index.html',
            filename: 'index.html',
            favicon: './favicon.ico'
          },
          isPro
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      new CleanWebpackPlugin(cleanOptions)
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 1,
            filename: '[name].bundle.js'
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    devServer: isPro ? undefined : {
      contentBase: './dist'
    }
  }
};