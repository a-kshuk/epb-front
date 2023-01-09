declare namespace TagModuleScssNamespace {
  export interface ITagModuleScss {
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
