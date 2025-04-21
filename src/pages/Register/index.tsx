import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../app/hooks';
// import { useRegisterMutation } from '../../services/rtk/authApi';
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
 * 注册页面组件
 */
const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [register, { isLoading, error }] = useRegisterMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // 模拟loading和error状态
  // const isLoading = false;
  // const error = null;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    if (password !== confirmPassword) {
      setError('两次输入的密码不匹配');
      return;
    }
    
    // 简单的密码复杂度验证
    if (password.length < 6) {
      setError('密码长度至少需要6个字符');
      return;
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('请输入有效的电子邮箱地址');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // 实际应用中，这里应该调用API进行注册
      // 模拟注册成功
      setTimeout(() => {
        // 存储一些用户信息到本地存储中（模拟后端存储）
        // 注意：真实应用中不应该将密码存储在本地
        localStorageUtil.setItem('registeredUsers', {
          [username]: {
            email,
            password, // 实际应用中应该在后端加密存储
            createdAt: new Date().toISOString()
          }
        }, 7 * 24 * 60 * 60 * 1000); // 保存一周
        
        // 注册成功后跳转到登录页，并传递注册成功的状态
        navigate('/login', { state: { registrationSuccess: true, username } });
        
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('注册失败:', err);
      setError('注册失败，请稍后再试');
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>用户注册</h2>
      
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
        <Label htmlFor="email">电子邮箱</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="请输入电子邮箱"
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
      
      <FormGroup>
        <Label htmlFor="confirmPassword">确认密码</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="请再次输入密码"
          required
        />
      </FormGroup>
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      <SubmitButton type="submit" disabled={loading}>
        {loading ? '注册中...' : '注册'}
      </SubmitButton>
      
      <LinkContainer>
        <Link to="/login">已有账号？立即登录</Link>
      </LinkContainer>
    </Form>
  );
};

export default Register; 