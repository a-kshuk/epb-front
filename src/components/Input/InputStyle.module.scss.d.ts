declare namespace InputStyleModuleScssNamespace {
  export interface IInputStyleModuleScss {
    input: string;
    input__error: string;
    input__title: string;
  }
}

declare const InputStyleModuleScssModule: InputStyleModuleScssNamespace.IInputStyleModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: InputStyleModuleScssNamespace.IInputStyleModuleScss;
};

export = InputStyleModuleScssModule;
