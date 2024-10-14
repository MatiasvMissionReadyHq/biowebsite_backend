const path = require('path');

module.exports = {
  // Entry point: The function file you want to bundle
  entry: './netlify/functions/server.js', // Change this to your server function path

  // Output: where to output the bundled function
  output: {
    filename: 'server.js', // The name of the output bundle file
    path: path.resolve(__dirname, 'netlify/functions'), // Output directory for the bundled function
    libraryTarget: 'commonjs2', // Required for Netlify Functions to work properly
  },

  // Mode: Set to development or production
  mode: 'development', // Change to 'production' for optimized builds

  // Target: Specify the environment
  target: 'node', // Target Node.js environment

  // Module: Rules for how different file types should be processed
  module: {
    rules: [
      {
        test: /\.js$/, // Transform .js files using Babel
        exclude: /node_modules/, // Exclude node_modules from being processed
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Use the preset for ES6+ features
          },
        },
      },
    ],
  },

  // Development settings (if applicable)
  devtool: 'inline-source-map', // Enable source maps for easier debugging
};
