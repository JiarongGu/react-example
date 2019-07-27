const path = require("path");

const appSrc = path.join(__dirname, "./src");
const appPublic = path.resolve(__dirname, "./public");
const appBuild = path.resolve(__dirname, "./build");

const alias = {};

module.exports = {
  appSrc: appSrc,
  appBuild: appBuild,
  appPublic: appPublic,
  publicPath: '/',
  alias: alias
};
