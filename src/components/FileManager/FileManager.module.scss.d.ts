declare namespace FileManagerModuleScssNamespace {
  export interface IFileManagerModuleScss {
    file_manager: string;
    file_manager__children: string;
    file_manager__files: string;
    file_manager__item: string;
    file_manager__item__children: string;
    file_manager__item__image: string;
    file_manager__title: string;
  }
}

declare const FileManagerModuleScssModule: FileManagerModuleScssNamespace.IFileManagerModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FileManagerModuleScssNamespace.IFileManagerModuleScss;
};

export = FileManagerModuleScssModule;
