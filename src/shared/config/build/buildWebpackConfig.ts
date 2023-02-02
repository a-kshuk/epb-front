import webpack from 'webpack';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { IBuildOptions } from './types/config';

export const buildWebpackConfig = (
  options: IBuildOptions
): webpack.Configuration => {
  const { paths, mode } = options;
  return {
    mode: mode,
    entry: {
      index: paths.entry,
    },
    devtool: 'inline-source-map',
    devServer: {
      static: paths.devServer,
      historyApiFallback: true,
    },
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
