declare namespace TagModuleScssNamespace {
  export interface ITagModuleScss {
    H0: string;
    H1: string;
    H2: string;
    H3: string;
    H4: string;
    P1: string;
    P2: string;
    P3: string;
    P4: string;
    icon__remove: string;
    tag: string;
    tag__blue: string;
    tag__gray: string;
    tag__green: string;
    tag__red: string;
    tag__remove: string;
    tag__yellow: string;
  }
}

declare const TagModuleScssModule: TagModuleScssNamespace.ITagModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TagModuleScssNamespace.ITagModuleScss;
};

export = TagModuleScssModule;
