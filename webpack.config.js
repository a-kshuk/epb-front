const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env) => {
  return {
    mode: 'development',
    entry: {
      index: './src/index.tsx',
    },
    devtool: 'inline-source-map',
    devServer: {
      static: './public',
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        // inject: true,
        template: path.resolve(__dirname, './public/index.html'),
      }),
      new ESLintPlugin(),
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      clean: true,
    },
    //TODO: Доработать оптимизацию
    optimization: {
      // moduleIds: 'deterministic',
      // runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    //TODO: добавить кэширование
    // cache: {
    // },
    module: {
      rules: [
        {
          test: /\.s?css$/,
          exclude: path.resolve(__dirname, './node_modules'),
          use: [
            {
              loader: 'style-loader',
            },
            '@teamsupercell/typings-for-css-modules-loader',
            {
              loader: 'css-loader',
              // options: {
              //   modules: {
              //     mode: 'local',
              //     localIdentName: '[name][local]--[hash:3]',
              //   },
              // },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(csv|tsv)$/i,
          use: ['csv-loader'],
        },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /(node_modules|bower_components)/,
          // include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            allowTsInNodeModules: true,
          },
        },
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.scss'],
    },
  };
};
