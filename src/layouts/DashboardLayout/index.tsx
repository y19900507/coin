import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logout } from '../../store/slices/authSlice';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// 样式组件
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const Header = styled.header`
  background-color: #001529;
  color: white;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
`;

const MenuItem = styled(Link)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  color: ${props => props.active ? 'white' : 'rgba(255,255,255,0.65)'};
  background-color: ${props => props.active ? '#1890ff' : 'transparent'};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: white;
    background-color: ${props => props.active ? '#1890ff' : 'rgba(255,255,255,0.1)'};
  }
`;

const MenuItemIcon = styled.span`
  margin-right: 10px;
`;

const UserDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserMenu = styled.div<{ show: boolean }>`
  position: absolute;
  right: 0;
  top: 45px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  min-width: 160px;
  z-index: 1000;
  display: ${props => props.show ? 'block' : 'none'};
`;

const UserMenuItem = styled.a`
  display: block;
  padding: 8px 16px;
  color: #001529;
  text-decoration: none;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Content = styled.main`
  padding: 24px;
  flex: 1;
  overflow: auto;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const LoginButton = styled(Link)`
  background-color: #1890ff;
  color: white;
  padding: 6px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    background-color: #096dd9;
  }
`;

/**
 * 仪表盘布局组件
 * 包含顶部导航栏和内容区域
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // 清除token
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo>交易平台</Logo>
          <NavMenu>
            <MenuItem to="/" active={location.pathname === '/'}>
              <MenuItemIcon>🏠</MenuItemIcon>
              首页
            </MenuItem>
            <MenuItem to="/market" active={location.pathname === '/market'}>
              <MenuItemIcon>📈</MenuItemIcon>
              市场行情
            </MenuItem>
            <MenuItem to="/trade" active={location.pathname.startsWith('/trade')}>
              <MenuItemIcon>💱</MenuItemIcon>
              交易
            </MenuItem>
            <MenuItem to="/wallet" active={location.pathname === '/wallet'}>
              <MenuItemIcon>💰</MenuItemIcon>
              钱包
            </MenuItem>
            <MenuItem to="/settings" active={location.pathname === '/settings'}>
              <MenuItemIcon>⚙️</MenuItemIcon>
              设置
            </MenuItem>
          </NavMenu>
          {isAuthenticated ? (
            <UserDropdown>
              <UserButton onClick={() => setShowUserMenu(!showUserMenu)}>
                <span>{user?.username || '用户'}</span>
                <span>▼</span>
              </UserButton>
              <UserMenu show={showUserMenu}>
                <UserMenuItem href="/settings">个人资料</UserMenuItem>
                <UserMenuItem as="button" onClick={handleLogout}>退出登录</UserMenuItem>
              </UserMenu>
            </UserDropdown>
          ) : (
            <div>
              <LoginButton to="/login">登录</LoginButton>
            </div>
          )}
        </HeaderContent>
      </Header>
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default DashboardLayout; 