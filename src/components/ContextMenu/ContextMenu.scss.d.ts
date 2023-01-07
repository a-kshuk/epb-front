declare namespace ContextMenuScssNamespace {
  export interface IContextMenuScss {
    'context-menu': string;
    'context-menu__list': string;
  }
}

declare const ContextMenuScssModule: ContextMenuScssNamespace.IContextMenuScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ContextMenuScssNamespace.IContextMenuScss;
};

export = ContextMenuScssModule;
