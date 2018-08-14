const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        },
        include: [ /symbols/ ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader'
        }, {
          loader: 'less-loader'
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader'
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
