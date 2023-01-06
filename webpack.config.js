const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  // entry: {
  //   main: './src/index.tsx',
  // },
  // context: __dirname,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          allowTsInNodeModules: true,
        },
      },

      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'source-map-loader',
      // },

      {
        test: /\.s?css$/,
        exclude: path.resolve(dirname, './node_modules'),
        use: [
          {
            loader: 'style-loader',
          },
          // '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name][local]--[hash:3]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.s?css$/,
        include: path.resolve(__dirname, './node_modules'),
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.svg$/,
      //   oneOf: [
      //     {
      //       resourceQuery: /url/, // *.svg?url такие адреса при импорте будут импортировать свг как base64
      //       type: 'asset',
      //     },
      //     {
      //       resourceQuery: /icon/, // *.svg?icon
      //       loader: '@svgr/webpack',
      //       options: iconSvgrConfig,
      //     },
      //     {
      //       issuer: /\.tsx?$/,
      //       use: ['@svgr/webpack'],
      //     },
      //   ],
      // },
      // {
      //   test: /\.(png|webp|jpg)$/,
      //   exclude: path.resolve(__dirname, './src/ui-kit/Icon/assets'),
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,
      //         fallback: 'file-loader',
      //         outputPath: 'customer-static',
      //         name: '[name].[ext]',
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: path.resolve(__dirname, './src/ui-kit/Icon/assets'),
      //   use: 'raw-loader',
      // },
      // {
      //   test: /\.(woff|woff2)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         outputPath: 'customer-static',
      //         name: '[name].[ext]',
      //       },
      //     },
      //   ],
      // },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // '@components': path.resolve(__dirname, 'src/components'),
      // '@theme': path.resolve(__dirname, 'src/theme/'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
};
