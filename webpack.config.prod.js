const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
  entry: [
    "@babel/polyfill",
    path.resolve(__dirname, 'src/index.js')
  ],
  mode: "production",
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: '[name].[contenthash].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  node: { fs: 'empty' },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /(\.css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
      {
        test: /\.md$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'posts/'
          }
        }]
      }

    ]
  },
  plugins: [
    new CopyPlugin(
      [
        {
          context: __dirname + '/src',
          from: '_redirects',
          to: '',
        },
        {
          context: __dirname + '/src',
          from: 'posts/**/*',
          to: '',
        },
      ]
    ),
    new SitemapPlugin('https://wwww.sporule.com', [
      "/",
      "/bargains/",
      "/faq/",
    ]),
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: "/links",
        }
      ],
      sitemap: "https://www.sporule.com/sitemap.xml",
      host: "https://www.sporule.com"
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'Sporule'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new OfflinePlugin({
      responseStrategy: 'cache-first',
      excludes: ['**/.*', '**/*.map', '**/*.gz', '**/*.txt', '**/sw.js', '**/*.md', '**/_redirects'],
      autoUpdate: 1000 * 60 * 2,
      externals: [
        'https://cdn.jsdelivr.net/npm/pwacompat@2.0.7/pwacompat.min.js',
        'https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.slim.min.js',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'
      ],
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].css"
    }),
    new WebpackPwaManifest({
      name: 'Sporule',
      short_name: 'Sporule',
      description: 'Sporule',
      background_color: '#ffffff',
      includeDirectory: 'manifest.json',
      orientation: 'any',
      crossorigin: 'anonymous', //can be null, use-credentials or anonymous
      "theme_color": "#3367D6",
      icons: [
        {
          src: path.resolve('publish_assets/Logo.png'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        }
      ],
      ios: {
        'apple-mobile-web-app-title': 'Sporule',
        'apple-mobile-web-app-status-bar-style': 'black-translucent'
      }
    })
  ]
}



