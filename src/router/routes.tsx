import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

// 路由配置类型
export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  exact?: boolean;
  authRequired?: boolean;
  layout?: string;
  children?: RouteConfig[];
  redirect?: string;
}

// 用于创建占位符组件的函数
const createPlaceholder = (text: string) => {
  const Component = () => React.createElement('div', null, text);
  return Promise.resolve({ default: Component });
};

// 懒加载组件（占位符组件，直到真实组件创建出来）
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Trade = lazy(() => import('../pages/Trade'));
const Market = lazy(() => import('../pages/Market'));
const Wallet = lazy(() => import('../pages/Wallet'));
const Settings = lazy(() => import('../pages/Settings'));
const NotFound = lazy(() => import('../pages/NotFound'));

// 路由配置
const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: Home,
    authRequired: false,
    layout: 'dashboard'
  },
  {
    path: '/login',
    exact: true,
    component: Login,
    authRequired: false,
    layout: 'auth'
  },
  {
    path: '/register',
    exact: true,
    component: Register,
    authRequired: false,
    layout: 'auth'
  },
  {
    path: '/trade/:symbol?',
    exact: true,
    component: Trade,
    authRequired: false,
    layout: 'dashboard'
  },
  {
    path: '/market',
    exact: true,
    component: Market,
    authRequired: false,
    layout: 'dashboard'
  },
  {
    path: '/wallet',
    exact: true,
    component: Wallet,
    authRequired: false,
    layout: 'dashboard'
  },
  {
    path: '/settings',
    exact: true,
    component: Settings,
    authRequired: false,
    layout: 'dashboard'
  },
  {
    path: '*',
    component: NotFound,
    authRequired: false,
    layout: 'dashboard'
  }
];

export default routes; 