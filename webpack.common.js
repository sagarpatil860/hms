const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // The entry point where Webpack starts building the dependency graph.
  // In a React app, this is typically your root component file.
  entry: "./src/index.tsx",

  // Defines how and where Webpack should output your bundled files.
  output: {
    // The output directory for your compiled files.
    // path: path.resolve(__dirname, 'dist'), // Example output directory 'dist'
    filename: "[name].[contenthash].js", // Use contenthash for long-term caching in production
    // Cleans the output directory before emit. Useful for production builds to remove old files.
    // clean: true, // Example: Enable for production builds
  },

  // Defines how modules are resolved when importing them.
  resolve: {
    // These extensions will be resolved automatically when importing modules without specifying the extension.
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css"], // Example: Include common file types
    alias: {
      "@api": path.resolve(__dirname, "src/api"),
      "@auth": path.resolve(__dirname, "src/auth"),
      "@components": path.resolve(__dirname, "src/components"),
      "@routing": path.resolve(__dirname, "src/routing"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@shared-types": path.resolve(__dirname, "src/shared-types"),
    },
  },

  // Defines rules for processing different types of modules (files).
  module: {
    rules: [
      // Rule for handling TypeScript and JavaScript files.
      {
        test: /\.(ts|tsx|js|jsx)$/, // Matches .ts, .tsx, .js, and .jsx files
        exclude: /node_modules/, // Excludes files in node_modules from being processed by this rule
        use: {
          loader: "babel-loader", // Uses Babel to transpile the code
          // Options for babel-loader can be configured here or in a separate .babelrc file.
          // options: { presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'] }
        },
      },

      // Rule for handling image files (PNG, JPG, JPEG, GIF).
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Matches image file types
        // Asset Modules in Webpack 5 replace file-loader, url-loader, etc.
        // type: 'asset/resource' emits a separate file and exports the URL.
        // type: 'asset/inline' inlines the file into the bundle as a data URI.
        // type: 'asset' automatically chooses between resource and inline based on file size (default: 8kb).
        type: "asset/resource", // Example: Treat images as separate resources
        generator: {
          filename: "assets/images/[name].[contenthash][ext]", // Output path and naming convention for images
        },
      },
      // Rule for handling font files (WOFF, WOFF2, TTF, OTF, EOT).
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/i, // Matches font file types
        type: "asset/resource", // Treat fonts as separate resources
        generator: {
          filename: "assets/fonts/[name].[contenthash][ext]", // Output path and naming convention for fonts
        },
      },
    ],
  },

  // Defines plugins that customize the Webpack build process.
  plugins: [
    // Generates an HTML file and injects your bundled JavaScript automatically.
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"), // Path to your HTML template file
      filename: "index.html", // Output filename for the generated HTML
      // inject: true, // Injects all assets into the template
    }),
    // Automatically adds the webpack-dev-server client entry point for HMR support.
    // new webpack.HotModuleReplacementPlugin(), // Example: Useful if you need explicit control over HMR. Often enabled by devServer.hot: true
  ],

  // Optimizations specific to Webpack 5.
  optimization: {
    // Used for code splitting, breaking bundles into smaller chunks.
    splitChunks: {
      chunks: "all", // Optimize all chunks, including dynamically imported modules
      // minSize: 20000, // Minimum size of a chunk before splitting, example in bytes
      // maxSize: 50000, // Maximum size of a chunk, example in bytes
      // cacheGroups: {
      //   vendor: { // Creates a 'vendor' chunk for modules from node_modules
      //     test: /[\\/]node_modules[\\/]/,
      //     name: 'vendors',
      //     chunks: 'all',
      //   },
      // },
    },
  },
};
