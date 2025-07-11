const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Extracts CSS into separate files
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Minimizes CSS in production
const TerserPlugin = require("terser-webpack-plugin"); // Minimizes JavaScript in production

module.exports = merge(common, {
  // Sets the build mode to 'production'. This enables built-in optimizations like minification.
  mode: "production",

  // Disables source maps in production builds for security and smaller bundle size.
  devtool: false,

  // Optimizations specific to production builds.
  optimization: {
    // Minimizers used to optimize the output.
    minimizer: [
      // Minimizes JavaScript code using Terser.
      new TerserPlugin({
        // parallel: true, // Enables multi-process parallel running for faster build
        // terserOptions: { // Options passed to Terser
        //   compress: {
        //     drop_console: true, // Removes console.log statements
        //   },
        // },
      }),
      // Minimizes CSS code.
      new CssMinimizerPlugin(),
    ],
    // Allows removing unused exports. Needs 'sideEffects: false' in package.json for optimal tree-shaking.
    // treeShaking: true, // Enabled by default in production mode
    // splitChunks: { // Example: Further fine-tune code splitting for production
    //   chunks: 'all',
    //   minSize: 20000,
    //   maxSize: 50000,
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all',
    //     },
    //   },
    // },
  },

  // Defines additional rules for loaders that are specific to production.
  module: {
    rules: [
      // Rule for handling CSS files in production.
      {
        test: /\.css$/, // Matches .css files
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files for better caching
          "css-loader", // Interprets @import and url() like import/require() and resolves them
        ],
      },
    ],
  },

  // Defines additional plugins specific to production.
  plugins: [
    // Extracts CSS from JavaScript bundles into separate .css files.
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css", // Output path and naming convention for CSS files
    }),
    // Cleans the output directory before build.
    // new (require('clean-webpack-plugin').CleanWebpackPlugin)(), // Example: Use if needed, but output.clean handles this in Webpack 5
  ],
});
