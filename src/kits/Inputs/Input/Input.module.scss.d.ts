declare namespace InputModuleScssNamespace {
  export interface IInputModuleScss {
    container: string;
    container__label: string;
    disabled: string;
    error: string;
    helper: string;
    input__container: string;
    input__icon: string;
    input__text: string;
    label: string;
    secondLabel: string;
    success: string;
  }
}

declare const InputModuleScssModule: InputModuleScssNamespace.IInputModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: InputModuleScssNamespace.IInputModuleScss;
};

export = InputModuleScssModule;
