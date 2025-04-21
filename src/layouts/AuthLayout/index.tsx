import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
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
`;

const MenuItem = styled(Link)`
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  padding: 0 16px;
  font-weight: 500;
  
  &:hover {
    color: white;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FormContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 480px;
`;

const FormLogo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
`;

const BrandArea = styled.div`
  display: none;
  width: 100%;
  max-width: 600px;
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  padding: 40px;
  color: white;
  justify-content: center;
  align-items: center;

  @media (min-width: 992px) {
    display: flex;
  }
`;

/**
 * 认证页面布局组件
 * 用于登录、注册、忘记密码等页面
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo>交易平台</Logo>
          <NavMenu>
            <MenuItem to="/">首页</MenuItem>
            <MenuItem to="/market">市场行情</MenuItem>
          </NavMenu>
        </HeaderContent>
      </Header>
      <MainContainer>
        <ContentArea>
          <FormContainer>
            <FormLogo>欢迎</FormLogo>
            {children}
          </FormContainer>
        </ContentArea>
        <BrandArea>
          <div>
            <h1>欢迎使用交易平台</h1>
            <p>安全可靠的数字资产交易平台，为您提供专业的交易服务。</p>
          </div>
        </BrandArea>
      </MainContainer>
    </Container>
  );
};

export default AuthLayout; 