import webpack from 'webpack';
import { IBuildOptions } from './types/config';

export const buildResolvers = (
  options: IBuildOptions
): webpack.ResolveOptions => {
  return {
    // alias: {
    //   shared: paths.shared,
    //   entities: paths.entities,
    //   features: paths.features,
    // },
    extensions: ['.ts', '.tsx', '.js'],
    preferAbsolute: true,
    modules: [options.paths.src, 'node_modules'],
    mainFiles: ['index'],
    alias: {},
  };
};
