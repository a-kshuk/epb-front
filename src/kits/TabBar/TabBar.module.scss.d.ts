declare namespace TabBarModuleScssNamespace {
  export interface ITabBarModuleScss {
    tab: string;
    tab__selected: string;
    tab_bar: string;
    tab_bar__left: string;
    tab_bar__left__tabs: string;
  }
}

declare const TabBarModuleScssModule: TabBarModuleScssNamespace.ITabBarModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TabBarModuleScssNamespace.ITabBarModuleScss;
};

export = TabBarModuleScssModule;
