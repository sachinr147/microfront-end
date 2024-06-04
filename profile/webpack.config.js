const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StandaloneSingleSpaPlugin = require("standalone-single-spa-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const isStandalone = env && env.standalone;
  const orgName = "app";
  const projectName = "profile";

  const baseConfig = {
    entry: path.resolve(__dirname, "src/main.js"),
    output: {
      filename: "js/app.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      libraryTarget: "system",
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
      }),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      }),
    ],
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm-bundler.js",
      },
      extensions: [".js", ".vue", ".json"],
    },
  };

  const standaloneConfig = {
    plugins: [
      new StandaloneSingleSpaPlugin({
        appOrParcelName: projectName,
        orgName: orgName,
      }),
    ],
  };

  return isStandalone ? merge(baseConfig, standaloneConfig) : baseConfig;
};
