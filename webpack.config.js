const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const comicData = require('./src/data/comics.json');

const lastComic = Object.keys(comicData).length;

const isDevelopment = process.env.NODE_ENV !== 'production';

const comicPageGenerators = [];

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

for (let i = 0; i <= lastComic; i++) {
  const comicId = i || lastComic;
  const filename = `${i || 'index'}.html`;
  const { title, hover } = comicData[`${comicId}`];

  comicPageGenerators.push(new HtmlWebpackPlugin({
    template: 'templates/index.html',
    filename,
    templateParameters: {
      title,
      hover,
      comicId,
      lastComic,
      randomId: randomInt(lastComic) + 1,
    },
  }));
}

const config = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: 'cheap-source-map',
  context: path.join(__dirname, 'src'),
  entry: ['./main.ts'],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    publicPath: '/',
    hot: true,
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.min.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader', options: { injectType: 'styleTag' } },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'assets', to: '' },
      ],
    }),
    ...comicPageGenerators,
  ],
};

module.exports = config;
