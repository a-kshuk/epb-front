import { Configuration as DevServerConfigurations } from 'webpack-dev-server';
import { IBuildOptions } from './types/config';

export const buildDevServer = (
  options: IBuildOptions
): DevServerConfigurations => {
  return {
    port: options.port,
    open: true,
    static: options.paths.devServer,
    historyApiFallback: true,
  };
};
