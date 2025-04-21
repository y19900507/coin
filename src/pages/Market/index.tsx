import React from 'react';
import styled from 'styled-components';

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

/**
 * 市场行情页面组件
 */
const Market: React.FC = () => {
  return (
    <Container>
      <Title>市场行情</Title>
      
      <Card>
        <PlaceholderText>
          这是市场行情页面的占位符组件，实际开发中会显示加密货币市场行情数据。
        </PlaceholderText>
      </Card>
    </Container>
  );
};

export default Market; 