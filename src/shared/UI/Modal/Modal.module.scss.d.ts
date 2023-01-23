declare namespace ModalModuleScssNamespace {
  export interface IModalModuleScss {
    modal: string;
    modal__buttons: string;
    modal__children: string;
    modal__close: string;
    modal__header: string;
    modal__title: string;
    modal__window: string;
  }
}

declare const ModalModuleScssModule: ModalModuleScssNamespace.IModalModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ModalModuleScssNamespace.IModalModuleScss;
};

export = ModalModuleScssModule;
