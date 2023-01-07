declare namespace LayoutScssNamespace {
  export interface ILayoutScss {
    active: string;
    footer: string;
    header: string;
    header__link__button: string;
    main: string;
    root: string;
  }
}

declare const LayoutScssModule: LayoutScssNamespace.ILayoutScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LayoutScssNamespace.ILayoutScss;
};

export = LayoutScssModule;
