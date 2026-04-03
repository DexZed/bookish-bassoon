import path from "path";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import "webpack-dev-server";


const config: webpack.Configuration = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  target:"node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
       },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },

  output: {
    filename: "bundle.js",
    clean: true,
    path: path.resolve(__dirname, "dist"),
  },
  
 node: {
    __dirname: false,
    __filename: false,
  },
};

export default config;