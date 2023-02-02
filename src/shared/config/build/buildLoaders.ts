import webpack from 'webpack';
import { IBuildOptions } from './types/config';

export const buildLoaders = ({
  paths,
}: IBuildOptions): webpack.RuleSetRule[] => {
  const styleLoader = {
    test: /\.s?css$/,
    exclude: paths.nodeModules,
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
  };

  const imgLoader = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const fontLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  };

  const scvLoader = {
    test: /\.(csv|tsv)$/i,
    use: ['csv-loader'],
  };

  const babelLoader = {
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
  };

  const tsLoader = {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: '/node_modules/',
    // options: {
    //   allowTsInNodeModules: true,
    // },
  };

  return [styleLoader, imgLoader, fontLoader, scvLoader, babelLoader, tsLoader];
};
