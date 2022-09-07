const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const deps = require('./package.json').dependencies

module.exports = {
    mode: 'development',
    devServer: {
        port: 8082,
    },
    output: {
        filename: 'main.js',
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
            name: "bookingModule",
            filename: "remoteEntry.js",
            remotes: {},
            exposes: {
              "./Counter":"./src/Counter.js"
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
};