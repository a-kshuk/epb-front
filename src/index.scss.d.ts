declare namespace IndexScssNamespace {
  export interface IIndexScss {
    H0: string;
    H1: string;
    H2: string;
    H3: string;
    H4: string;
    P1: string;
    P2: string;
    P3: string;
    P4: string;
    'no-selected': string;
  }
}

declare const IndexScssModule: IndexScssNamespace.IIndexScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexScssNamespace.IIndexScss;
};

export = IndexScssModule;
