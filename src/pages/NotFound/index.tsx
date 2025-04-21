import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #1890ff;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #333;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #666;
  max-width: 600px;
`;

const HomeLink = styled(Link)`
  background-color: #1890ff;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #096dd9;
  }
`;

const NotFound: React.FC = () => {
  return (
    <Container>
      <Title>404</Title>
      <Subtitle>页面未找到</Subtitle>
      <Description>
        您请求的页面不存在或已被移动到其他位置。
        请检查URL是否正确，或返回首页继续浏览。
      </Description>
      <HomeLink to="/">返回首页</HomeLink>
    </Container>
  );
};

export default NotFound; 