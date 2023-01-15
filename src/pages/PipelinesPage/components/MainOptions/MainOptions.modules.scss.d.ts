declare namespace MainOptionsModulesScssNamespace {
  export interface IMainOptionsModulesScss {
    container: string;
    container__tag: string;
  }
}

declare const MainOptionsModulesScssModule: MainOptionsModulesScssNamespace.IMainOptionsModulesScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MainOptionsModulesScssNamespace.IMainOptionsModulesScss;
};

export = MainOptionsModulesScssModule;
