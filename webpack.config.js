const path = require("path");
const webpack = require("webpack");
const slsw = require("serverless-webpack");
const fs = require("fs");
const stage = slsw.lib.serverless.variables.options.stage;
const env = require("dotenv").parse(
  fs.readFileSync(__dirname + `/.env.${stage}`, "utf8")
);
const envVars = Object.keys(env).reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(env[key]);
  return acc;
}, {});
console.log(envVars);

module.exports = {
  entry: slsw.lib.entries,
  mode: "production",
  resolve: {
    extensions: [".mjs", ".js", ".json", ".ts", ".tsx"]
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },
  target: "node",
  plugins: [new webpack.DefinePlugin(envVars)],
  module: {
    rules: [
      {
        test: /events\.js$/,
        use: [
          {
            loader: "raw-loader"
          }
        ]
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  }
};
