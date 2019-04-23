const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");

const base = {
  entry: {
    index: "./src/index.js",
    demo: "./src/demo.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-private-methods"
            ]
          }
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src,audio:src,video:src"]
          }
        }
      },
      {
        test: /\.pug$/,
        loader: ["html-loader", "pug-html-loader"]
      },
      {
        oneOf: [
          {
            test: /global\.scss$/,
            loader: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 2
                }
              },
              "sass-loader",
              "postcss-loader"
            ]
          },
          {
            test: /\.scss$/,
            loader: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 2,
                  modules: true,
                  localIdentName: "[name]--[local]--[hash:base64:5]"
                }
              },
              "sass-loader",
              "postcss-loader"
            ]
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  }
};
const dev = {
  mode: "development",
  output: {
    filename: "[name].[hash].js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 4096
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
      chunks: ["demo"]
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    open: true
  }
};

const prod = {
  mode: "production",
  output: {
    filename: "[name].js"
  },
  devtool: "none",
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 4096,
            name: "[name].[ext]"
          }
        }
      }
    ]
  },
  optimization: {
    usedExports: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new BundleAnalyzerPlugin()
  ]
};

module.exports = ({ development }) =>
  development ? merge(base, dev) : merge(base, prod);
