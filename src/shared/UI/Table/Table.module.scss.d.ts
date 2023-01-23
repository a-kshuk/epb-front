declare namespace TableModuleScssNamespace {
  export interface ITableModuleScss {
    table: string;
  }
}

declare const TableModuleScssModule: TableModuleScssNamespace.ITableModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TableModuleScssNamespace.ITableModuleScss;
};

export = TableModuleScssModule;
