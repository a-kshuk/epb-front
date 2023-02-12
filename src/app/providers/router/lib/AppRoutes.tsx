import { HomePage } from 'pages/HomePage';
import { LogoutPage } from 'pages/LogoutPage';
import { NewsPage } from 'pages/NewsPage';
import { PipelinesPage } from 'pages/PipelinesPage';
import { SingInPage } from 'pages/SingInPage';
import { SingUpPage } from 'pages/SingUpPage';
import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
  HOME = 'home',
  NEWS = 'news',
  PIPELINES = 'pipelines',
  SIGN_IN = 'singIn',
  SIGN_UP = 'singUp',
  LOGOUT = 'logout',
}

export const RoutesPath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.NEWS]: '/news',
  [AppRoutes.PIPELINES]: '/pipelines',
  [AppRoutes.SIGN_IN]: '/sign-in',
  [AppRoutes.SIGN_UP]: '/sing-up',
  [AppRoutes.LOGOUT]: 'logout',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    index: true,
    path: RoutesPath.home,
    element: <HomePage />,
  },
  [AppRoutes.NEWS]: {
    path: RoutesPath.news,
    element: <NewsPage />,
  },
  [AppRoutes.PIPELINES]: {
    path: RoutesPath.pipelines,
    element: <PipelinesPage />,
  },
  [AppRoutes.SIGN_IN]: {
    path: RoutesPath.singIn,
    element: <SingInPage />,
  },
  [AppRoutes.SIGN_UP]: {
    path: RoutesPath.singUp,
    element: <SingUpPage />,
  },
  [AppRoutes.LOGOUT]: {
    path: RoutesPath.logout,
    element: <LogoutPage />,
  },
};
