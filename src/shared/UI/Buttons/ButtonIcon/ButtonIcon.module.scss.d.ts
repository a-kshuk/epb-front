declare namespace ButtonIconModuleScssNamespace {
  export interface IButtonIconModuleScss {
    button: string;
    red: string;
  }
}

declare const ButtonIconModuleScssModule: ButtonIconModuleScssNamespace.IButtonIconModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ButtonIconModuleScssNamespace.IButtonIconModuleScss;
};

export = ButtonIconModuleScssModule;
