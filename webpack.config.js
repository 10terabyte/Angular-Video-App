const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env["BACKEND_BASE_URL"]': JSON.stringify(process.env["BACKEND_BASE_URL"] || 'https://example.backend.com')
    })
  ],
};
