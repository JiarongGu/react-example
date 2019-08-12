const configureWebpack = require('../webpack.config');

module.exports = function({ config, mode }) {
  const webpackConfig = configureWebpack();
  config.plugins.push(...webpackConfig.plugins.slice(0, 2));

  const storybookConfig = {
    ...config,
    resolve: webpackConfig.resolve,
    module: { 
      ...config.module, 
      rules: webpackConfig.module.rules 
    }
  };

  return storybookConfig;
};
