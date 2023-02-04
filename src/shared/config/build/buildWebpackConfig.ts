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
    entry: {
      index: paths.entry,
    },
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
    plugins: buildPlugins(options),
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      publicPath: paths.publicPath,
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
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
  };
};
