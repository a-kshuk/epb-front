declare namespace InputBigModuleScssNamespace {
  export interface IInputBigModuleScss {
    container: string;
    container_fields: string;
    container_input: string;
    container_input__disable: string;
    container_input__error: string;
    container_input__success: string;
    helper: string;
    helper__error: string;
    helper__success: string;
    icon__error: string;
    icon__success: string;
    input: string;
    input__disable: string;
    input__error: string;
    input__success: string;
    label: string;
  }
}

declare const InputBigModuleScssModule: InputBigModuleScssNamespace.IInputBigModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: InputBigModuleScssNamespace.IInputBigModuleScss;
};

export = InputBigModuleScssModule;
