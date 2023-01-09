declare namespace InputTagModuleScssNamespace {
  export interface IInputTagModuleScss {
    container: string;
    container__error: string;
    container__helper: string;
    container__helper__icon: string;
    container__label: string;
    container__success: string;
    container__tags: string;
    empty: string;
    label: string;
    secondLabel: string;
  }
}

declare const InputTagModuleScssModule: InputTagModuleScssNamespace.IInputTagModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: InputTagModuleScssNamespace.IInputTagModuleScss;
};

export = InputTagModuleScssModule;
