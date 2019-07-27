const path = require('path');
const configWebpack = require('./config/configWebpack');

const paths = {
  appSrc: path.join(__dirname, './src'),
  appBuild: path.resolve(__dirname, './build'),
  appPublic: path.resolve(__dirname, './public'),
  appEntry: './index.tsx',
  publicPath: '/',
  alias: { 
    '@components': 'components', 
    '@services': 'services',
    '@asserts': 'asserts'
  }
};

const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.module\.(less)$/;
const lessAntdRegex = /node_modules[\/\\]+antd.*less$/;
const cssOutput = (name) => `static/css/${name}.[md5:contenthash:hex:20].css`;

const cssLoaders = [
  {
    test: lessRegex,
    output: cssOutput('global'),
    localIdentName: '[local]',
    exclude: [lessAntdRegex, lessModuleRegex],
    sideEffects: true
  },
  {
    test: lessAntdRegex,
    output: cssOutput('antd'),
    localIdentName: '[local]',
    sideEffects: true
  },
  {
    test: lessModuleRegex,
    output: cssOutput('module'),
    localIdentName: '[name]__[local]__[hash:base64:5]',
    otherLoaders: ['css-type-loader']
  }
];

// webpack-dev-server
const devServer = {
  hot: true,
  contentBase: paths.appBuild,
  publicPath: paths.publicPath,
  historyApiFallback: true,
};

module.exports = function() {
  return configWebpack({ paths, cssLoaders, devServer });
};
