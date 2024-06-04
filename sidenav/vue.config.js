// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: true,

//   configureWebpack: {
//     output: {
//       libraryTarget: "system",
//       filename: "js/app.js",
//     },
//   },
// });

const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryTarget: "system",
      filename: "js/app.js",
    },
    module: {
      rules: [
        // Other rules...
        {
          test: /\.svg$/,
          use: "vue-loader",
        },
      ],
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compilerOptions = {
          ...options.compilerOptions,
          isCustomElement: (tag) => ["md-linedivider"].includes(tag),
        };
        return options;
      });
  },
});
