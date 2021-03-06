const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
const path = require('path');

module.exports = {
  mode: 'development', // режим сборки
  entry: './src/main.js', // точка входа приложения
  output: { // настройки выходного файла
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  devtool: 'source-map',
  devServer: { // настройки сервера
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true // автоматическая перезагрузка страницы
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    })
  ]
};
