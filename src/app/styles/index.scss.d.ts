declare namespace IndexScssNamespace {
  export interface IIndexScss {
    container__btn: string;
    gap20px: string;
    gap5px: string;
    root: string;
  }
}

declare const IndexScss: IndexScssNamespace.IIndexScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexScssNamespace.IIndexScss;
};

export = IndexScss;
