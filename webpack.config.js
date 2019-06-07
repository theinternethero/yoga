'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  watch: true,

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/, // берем файлы именно оканчиваются js
        exclude: /(node_modules|bower_components)/, // здесь мы говорим что мы вытягивает оттуда плаггины
        use: { // как надо использовать палггин
          loader: 'babel-loader?optional[]=runtime', // loader во время сборки
          options: { // настройки
            presets: [ 
              ["@babel/env", { // env рекомендованный
                targets: { // какие браузеры хотим поддерживать
                  edge: "17",
                  firefox: "60",
                  chrome: "67",
                  safari: "11.1",
                  ie: "11"
                }
              }]
            ],
            plugins: ["es6-promise"]
          }
        }
      }
    ]
  }
};
