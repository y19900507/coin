import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

interface PrivateRouteProps {
  children?: React.ReactNode;
}

/**
 * 私有路由组件，用于保护需要授权的路由
 * 如果用户未登录，会重定向到登录页面
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // 重定向到登录页面，同时保存原始访问URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 如果已认证，渲染子路由或子组件
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute; 