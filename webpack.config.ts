import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
import { buildWebpackConfig, IBuildPaths } from './src/shared/config/build';

const paths: IBuildPaths = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  build: path.resolve(__dirname, 'build'),
  html: path.resolve(__dirname, 'public', 'index.html'),
  devServer: path.resolve(__dirname, 'public'),
  publicPath: path.resolve(__dirname, '/'),
  nodeModules: path.resolve(__dirname, './node_modules'),
  shared: path.resolve(__dirname, 'src', 'shared'),
  entities: path.resolve(__dirname, 'src', 'entities'),
  features: path.resolve(__dirname, 'src', 'features'),
};

const mode = 'development';
const isDev = mode === 'development';

const config: webpack.Configuration = buildWebpackConfig({
  mode,
  paths,
  isDev,
});

export default config;
