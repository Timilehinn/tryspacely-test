const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    // path: path.join(__dirname, 'build'),
    // filename: 'bundle.js',
    // chunkFilename: '[name].bundle.js',
    // publicPath: '/',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    chunkFilename: '[id].[chunkhash].js'
  },
  mode: "production",
  // mode: process.env.NODE_ENV || 'development',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.es6'],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
      {
          test: /\.scss$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
            {loader: 'postcss-loader'},
            { loader: "sass-loader" }
          ]
      },
        /*{
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", 'postcss-loader', "style-loader"],
      },*/
      {
        test: /\.(jpg|jpeg|png|gif|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new Dotenv(),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      filename: "[name].bundle.js.gz",
      algorithm: "gzip",
      deleteOriginalAssets: false
    }),
    new BundleAnalyzerPlugin(),
    //new MiniCssExtractPlugin(),
  ],
}
