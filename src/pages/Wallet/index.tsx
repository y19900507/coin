import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  color: #333;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const PlaceholderText = styled.div`
  color: #666;
  text-align: center;
  padding: 20px;
`;

const LoginPrompt = styled.div`
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  text-align: center;
`;

const LoginButton = styled(Link)`
  background-color: #1890ff;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  margin-top: 12px;
  
  &:hover {
    background-color: #096dd9;
  }
`;

/**
 * 钱包页面组件
 */
const Wallet: React.FC = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  return (
    <Container>
      <Title>资产钱包</Title>
      
      {!isAuthenticated && (
        <LoginPrompt>
          <h3>需要登录</h3>
          <p>您需要登录才能查看资产和交易记录</p>
          <LoginButton to="/login">立即登录</LoginButton>
        </LoginPrompt>
      )}
      
      <Card>
        <PlaceholderText>
          这是钱包页面的占位符组件，实际开发中会显示用户资产和交易记录。
          {!isAuthenticated && ' 登录后查看您的数字资产。'}
        </PlaceholderText>
      </Card>
    </Container>
  );
};

export default Wallet; 