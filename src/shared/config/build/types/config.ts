export type IBuildMode = 'production' | 'development';

export interface IBuildPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
  // devServer: string;
  // publicPath: string;
  // nodeModules: string;
}

export interface IBuildEnv {
  mode: IBuildMode;
  port: number;
}

export interface IBuildOptions {
  mode: IBuildMode;
  paths: IBuildPaths;
  isDev: boolean;
  port: number;
}
