import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout/index';
import AuthLayout from '../layouts/AuthLayout/index';

// 加载中组件
const Loading = () => (
  <div className="loading">
    <div className="spinner"></div>
    <p>加载中...</p>
  </div>
);

/**
 * 应用路由组件
 */
const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map((route, index) => {
            const RouteComponent = route.component;
            
            // 获取适当的布局组件
            let LayoutComponent;
            switch (route.layout) {
              case 'dashboard':
                LayoutComponent = DashboardLayout;
                break;
              case 'auth':
                LayoutComponent = AuthLayout;
                break;
              default:
                LayoutComponent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
            }
            
            // 生成路由元素
            const element = (
              <LayoutComponent>
                <RouteComponent />
              </LayoutComponent>
            );
            
            // 如果需要认证，使用PrivateRoute包装
            const wrappedElement = route.authRequired ? (
              <PrivateRoute>{element}</PrivateRoute>
            ) : element;
            
            // 重定向路由
            if (route.redirect) {
              return (
                <Route 
                  key={index}
                  path={route.path}
                  element={<Navigate to={route.redirect} replace />}
                />
              );
            }
            
            // 正常路由
            return (
              <Route 
                key={index}
                path={route.path}
                element={wrappedElement}
                caseSensitive={true}
              />
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter; 