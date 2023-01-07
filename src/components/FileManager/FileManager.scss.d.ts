declare namespace FileManagerScssNamespace {
  export interface IFileManagerScss {
    'file-manager': string;
    'file-manager__files': string;
    'file-manager__item': string;
    'file-manager__item__children': string;
    'file-manager__item__image': string;
    'file-manager__title': string;
  }
}

declare const FileManagerScssModule: FileManagerScssNamespace.IFileManagerScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FileManagerScssNamespace.IFileManagerScss;
};

export = FileManagerScssModule;
