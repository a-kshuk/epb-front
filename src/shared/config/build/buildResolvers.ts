import webpack from 'webpack';
import { IBuildOptions } from './types/config';

export const buildResolvers = ({
  paths,
}: IBuildOptions): webpack.ResolveOptions => {
  return {
    alias: {
      shared: paths.shared,
      entities: paths.entities,
      features: paths.features,
    },
    extensions: ['.ts', '.tsx', '.js'],
  };
};
