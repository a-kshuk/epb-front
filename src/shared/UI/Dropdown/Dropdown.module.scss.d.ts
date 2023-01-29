declare namespace DropdownModuleScssNamespace {
  export interface IDropdownModuleScss {
    arrow: string;
    arrow__down: string;
    select: string;
  }
}

declare const DropdownModuleScssModule: DropdownModuleScssNamespace.IDropdownModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DropdownModuleScssNamespace.IDropdownModuleScss;
};

export = DropdownModuleScssModule;
