import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { IBuildOptions } from './types/config';

export const buildLoaders = (options: IBuildOptions): webpack.RuleSetRule[] => {
  const { paths, isDev } = options;
  const cssLoader = {
    test: /\.s?css$/,
    exclude: paths.nodeModules,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // '@teamsupercell/typings-for-css-modules-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: isDev
              ? '[path][name]__[local]--[hash:base64:5]'
              : '[hash:base64:8]',
          },
        },
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

  const tsLoader = {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: '/node_modules/',
    // options: {
    //   allowTsInNodeModules: true,
    // },
  };

  return [tsLoader, cssLoader, imgLoader, fontLoader, scvLoader];
};
