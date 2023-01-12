declare namespace TabBarModuleScssNamespace {
  export interface ITabBarModuleScss {
    container_children: string;
    right_element: string;
    tab: string;
    tab__selected: string;
    tab_bar: string;
    tabs: string;
  }
}

declare const TabBarModuleScssModule: TabBarModuleScssNamespace.ITabBarModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TabBarModuleScssNamespace.ITabBarModuleScss;
};

export = TabBarModuleScssModule;
