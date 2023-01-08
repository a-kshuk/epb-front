declare namespace ButtonModuleScssNamespace {
  export interface IButtonModuleScss {
    H0: string;
    H1: string;
    H2: string;
    H3: string;
    H4: string;
    P1: string;
    P2: string;
    P3: string;
    P4: string;
    button: string;
    button__icon: string;
    button__icon__text: string;
  }
}

declare const ButtonModuleScssModule: ButtonModuleScssNamespace.IButtonModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ButtonModuleScssNamespace.IButtonModuleScss;
};

export = ButtonModuleScssModule;
