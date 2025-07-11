const { merge } = require("webpack-merge"); // Used to merge webpack configurations
const common = require("./webpack.common.js"); // Import the common configuration

module.exports = merge(common, {
  // Sets the build mode to 'development'. This enables useful development features like module names in bundles.
  mode: "development",

  // Configures the generation of source maps for debugging.
  // 'eval-source-map' is recommended for development as it's fast and provides good detail.
  // There are various options; choose one that balances speed and detail for your needs.
  devtool: "eval-source-map",

  // Webpack Dev Server configuration for local development.
  devServer: {
    // Specifies the port for the development server.
    port: 3000, // Example port
    // Enables Hot Module Replacement (HMR).
    // HMR updates modules in the browser without a full page reload, speeding up development.
    hot: true,
    // Enables historyApiFallback for applications using client-side routing (like React Router).
    // This allows navigating directly to routes without a full page refresh.
    historyApiFallback: true,
    // Specifies the directory to serve static files from.
    // contentBase: path.resolve(__dirname, 'dist'), // Example: serve static files from 'dist'
    // open: true, // Opens the browser automatically when the server starts
    // proxy: { // Example proxy configuration to forward API requests
    //   '/api': 'http://localhost:5000',
    // },
    // headers: { // Example: Add custom headers
    //   'Access-Control-Allow-Origin': '*',
    // },
  },

  // Defines additional rules for loaders that are specific to development.
  module: {
    rules: [
      // Rule for handling CSS files in development.
      {
        test: /\.css$/, // Matches .css files
        use: [
          "style-loader", // Injects CSS into the DOM via a <style> tag, enabling HMR for CSS
          "css-loader", // Interprets @import and url() like import/require() and resolves them
        ],
      },
    ],
  },
});
