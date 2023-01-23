declare namespace DropdownModuleScssNamespace {
  export interface IDropdownModuleScss {
    arrow: string;
    arrow__down: string;
    context_menu: string;
    dropdown: string;
    selector: string;
  }
}

declare const DropdownModuleScssModule: DropdownModuleScssNamespace.IDropdownModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DropdownModuleScssNamespace.IDropdownModuleScss;
};

export = DropdownModuleScssModule;
