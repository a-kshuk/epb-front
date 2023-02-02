import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { IBuildOptions } from './types/config';

export const buildPlugins = ({
  paths,
}: IBuildOptions): webpack.WebpackPluginInstance[] => {
  return [
    new HtmlWebpackPlugin({
      // inject: true,
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    new ESLintWebpackPlugin(),
  ];
};
