const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const deps = require('./package.json').dependencies
const path = require('path');

module.exports = {
    devServer: {
        port: 8081,
    },
    // output: {
    //     filename: 'main.js',
    //   },
    output: {
      path: path.resolve(__dirname, 'build'), // change this
      publicPath: '/',
      filename: 'bundle.js'
    },
      module: {
        rules: [{ 
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: { presets: [
                '@babel/env',
                ["@babel/preset-react", {"runtime": "automatic"}]
            ] },
         }, { 
            test: /\.css$/, 
            use: [ 'style-loader', 'css-loader' ] 
        }],
      },
      plugins: [
        new ModuleFederationPlugin({
            name: "container",
            remotes: {
                bookingModule:"bookingModule@https://fluffy-pika-3ce4e7.netlify.app/remoteEntry.js",
              },
            exposes: {
            },
            shared: {
              ...deps,
              react: {
                singleton: true,
                requiredVersion: deps.react,
              },
              "react-dom": {
                singleton: true,
                requiredVersion: deps["react-dom"],
              },
            },
          }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}