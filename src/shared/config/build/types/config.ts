export type IBuildMode = 'production' | 'development';

export interface IBuildPaths {
  entry: string;
  build: string;
  html: string;
  // devServer: string;
  // publicPath: string;
  // nodeModules: string;
  shared: string;
  entities: string;
  features: string;
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
