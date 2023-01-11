declare namespace LayoutModuleScssNamespace {
  export interface ILayoutModuleScss {
    footer: string;
    header: string;
    header__left: string;
    header__tabs: string;
    logo: string;
    logo__text: string;
    main: string;
    tab: string;
    tab__selected: string;
  }
}

declare const LayoutModuleScssModule: LayoutModuleScssNamespace.ILayoutModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LayoutModuleScssNamespace.ILayoutModuleScss;
};

export = LayoutModuleScssModule;
