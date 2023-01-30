import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import 'webpack-dev-server';

const config: webpack.Configuration = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src', 'index.tsx'),
  },
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // inject: true,
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new webpack.ProgressPlugin(),
    new ESLintPlugin(),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: path.resolve(__dirname, '/'),
    clean: true,
  },
  // TODO: Доработать оптимизацию
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
  // TODO: добавить кэширование
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
        exclude: /node_modules/,
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
        exclude: '/node_modules/',
        // options: {
        //   allowTsInNodeModules: true,
        // },
      },
    ],
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, 'src', 'shared'),
      entities: path.resolve(__dirname, 'src', 'entities'),
      features: path.resolve(__dirname, 'src', 'features'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
};

export default config;
