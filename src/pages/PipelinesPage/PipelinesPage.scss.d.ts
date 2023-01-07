declare namespace PipelinesPageScssNamespace {
  export interface IPipelinesPageScss {
    info: string;
    info__input: string;
    info__line: string;
  }
}

declare const PipelinesPageScssModule: PipelinesPageScssNamespace.IPipelinesPageScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PipelinesPageScssNamespace.IPipelinesPageScss;
};

export = PipelinesPageScssModule;
