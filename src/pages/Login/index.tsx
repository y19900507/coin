import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../app/hooks';
import { loginSuccess } from '../../store/slices/authSlice';
import { localStorageUtil } from '../../utils/storage';

// 样式组件
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #1890ff;
  }
`;

const SubmitButton = styled.button`
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #096dd9;
  }
  
  &:disabled {
    background-color: #bae7ff;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #f5222d;
  margin-top: 16px;
  text-align: center;
`;

const SuccessMessage = styled.div`
  color: #52c41a;
  margin-top: 16px;
  text-align: center;
`;

const LinkContainer = styled.div`
  text-align: center;
  margin-top: 16px;
  
  a {
    color: #1890ff;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

/**
 * 登录页面组件
 */
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  // 检查是否从注册页面跳转过来
  const registrationSuccess = location.state?.registrationSuccess;
  const registeredUsername = location.state?.username;
  
  // 如果有注册的用户名，自动填充
  useEffect(() => {
    if (registeredUsername) {
      setUsername(registeredUsername);
    }
  }, [registeredUsername]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // 获取注册的用户信息
      const registeredUsers = localStorageUtil.getItem<Record<string, { email: string, password: string, createdAt: string }>>('registeredUsers');
      
      // 验证用户名和密码
      if (registeredUsers && registeredUsers[username] && registeredUsers[username].password === password) {
        // 登录成功
        setTimeout(() => {
          // 模拟用户数据
          const userData = {
            id: '1',
            username,
            email: registeredUsers[username].email,
            role: 'user'
          };
          
          // 存储token（实际应用中由服务器返回）
          localStorage.setItem('token', 'fake-jwt-token');
          
          // 更新Redux状态
          dispatch(loginSuccess(userData));
          
          // 跳转到首页
          navigate('/');
        }, 1000);
      } else {
        // 登录失败
        setError('用户名或密码错误');
        setLoading(false);
      }
    } catch (err) {
      console.error('登录失败:', err);
      setError('用户名或密码错误');
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>用户登录</h2>
      
      {registrationSuccess && (
        <SuccessMessage>注册成功，请登录</SuccessMessage>
      )}
      
      <FormGroup>
        <Label htmlFor="username">用户名</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="请输入用户名"
          required
        />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="password">密码</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="请输入密码"
          required
        />
      </FormGroup>
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      <SubmitButton type="submit" disabled={loading}>
        {loading ? '登录中...' : '登录'}
      </SubmitButton>
      
      <LinkContainer>
        <Link to="/register">没有账号？立即注册</Link>
      </LinkContainer>
    </Form>
  );
};

export default Login; 