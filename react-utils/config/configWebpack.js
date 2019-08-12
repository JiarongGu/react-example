const webpack = require("webpack");
const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const resolveLessRules = require("./resolveLessRules");

/**
 * @typedef paths
 * @type {object}
 * @property {string} appSrc context path
 * @property {string} appEntry entry path
 * @property {string} appBuild output path
 * @property {string} publicPath public base path
 * @property {object} alias alias to files
 */

/**
 * @typedef cssLoader
 * @type {object}
 * @property {string} test test regex
 * @property {string} output output filename
 * @property {string} localIdentName filename format
 * @property {object} modifyVars override value for less
 * @property {object[]} otherLoaders other loaders
 * @property {string[]} exclude exclude regex
 * @property {object} sideEffects
 */

/**
 * @typedef config
 * @type {object}
 * @property {cssLoader[]} cssLoaders
 * @property {paths} paths
 * @property {devServer} devServer
 */

/**
 * config webpack object
 * @param {config} config
 */
module.exports = function(config) {
  let cssExtracts = [];
  let cssExtractPlugins = [];
  const { cssLoaders, paths, devServer } = config;

  if (cssLoaders && cssLoaders.length > 0) {
    const cssLoaderModels = cssLoaders.map(e => ({
      test: e.test,
      localIdentName: e.localIdentName,
      exclude: e.exclude,
      sideEffects: e.sideEffects,
      modifyVars: e.modifyVars,
      otherLoaders: e.otherLoaders,
      extractPlugin: new ExtractTextPlugin({ filename: e.output })
    }));

    cssExtracts = cssLoaderModels.map(e => resolveLessRules(e));
    cssExtractPlugins = cssLoaderModels.map(e => e.extractPlugin);
  }

  const resolveSource = (...args) => path.resolve(paths.appSrc, ...args);

  const resolvedAlias = Object.keys(paths.alias)
    .map(key => ({
      key: key,
      path: resolveSource(paths.alias[key])
    }))
    .reduce((a, c) => ((a[c.key] = c.path), a), {});

  return {
    context: paths.appSrc,
    entry: {
      app: paths.appEntry
    },
    output: {
      path: paths.appBuild,
      publicPath: paths.publicPath,
      filename: "static/js/[name].[hash:8].js",
      chunkFilename: "static/js/[name].[hash:8].chunk.js"
    },
    target: "web",
    resolve: {
      extensions: [".js", "jsx", ".json", ".ts", ".tsx"],
      alias: resolvedAlias
    },
    devServer,
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: ["babel-loader", "ts-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: false,
                name: "assets/[hash].[ext]"
              }
            }
          ]
        },
        ...cssExtracts
      ]
    },
    plugins: [
      ...cssExtractPlugins,
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new MiniCssExtractPlugin(),
      new WebpackCleanupPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(paths.appPublic, "index.html"),
        minify: false
      }),
      new CopyWebpackPlugin(
        [{ from: paths.appPublic, to: paths.appBuild }],
        { ignore: ["index.html"] }
      )
    ]
  };
};
