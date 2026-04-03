import path from "path";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";

const config: webpack.Configuration = {
  mode: "production", // Activates minification & tree-shaking
  entry: "./src/index.ts",
  target: "node",
  externals: [nodeExternals()], // Keeps node_modules out of the bundle
  
  devtool: "source-map", // Smaller bundle; maps are in a separate file
  
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
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  node: {
    __dirname: false,
    __filename: false,
  },

  // Note: DefinePlugin is removed here to keep secrets out of the build
};

export default config;