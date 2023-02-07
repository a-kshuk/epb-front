import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { IBuildOptions } from './types/config';

export const buildWebpackConfig = (
  options: IBuildOptions
): webpack.Configuration => {
  const { paths, mode, isDev } = options;
  return {
    mode,
    entry: paths.entry,
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
    plugins: buildPlugins(options),
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      // publicPath: paths.publicPath,
      clean: true,
    },
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
  };
};
