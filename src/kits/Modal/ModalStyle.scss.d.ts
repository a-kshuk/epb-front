declare namespace ModalStyleScssNamespace {
  export interface IModalStyleScss {
    modal: string;
    modal__buttons: string;
    modal__children: string;
    modal__header: string;
    modal__window: string;
  }
}

declare const ModalStyleScssModule: ModalStyleScssNamespace.IModalStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ModalStyleScssNamespace.IModalStyleScss;
};

export = ModalStyleScssModule;
