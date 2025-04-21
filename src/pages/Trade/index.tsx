import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
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
  background-color: #f9f0ff;
  border: 1px solid #d3adf7;
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
 * 交易页面组件
 */
const Trade: React.FC = () => {
  // 获取URL中的symbol参数
  const { symbol = 'BTCUSDT' } = useParams<{ symbol?: string }>();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  return (
    <Container>
      <Title>交易 {symbol}</Title>
      
      {!isAuthenticated && (
        <LoginPrompt>
          <h3>需要登录</h3>
          <p>您需要登录才能进行交易操作</p>
          <LoginButton to="/login">立即登录</LoginButton>
        </LoginPrompt>
      )}
      
      <Card>
        <PlaceholderText>
          这是交易页面的占位符组件，实际开发中会实现完整的交易功能。
          {!isAuthenticated && ' 登录后即可进行买入和卖出操作。'}
        </PlaceholderText>
      </Card>
    </Container>
  );
};

export default Trade; 