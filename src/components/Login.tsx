import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../utils/api';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-color);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: var(--border-radius);
  border: 1px solid #ccc;
  background-color: var(--dark-bg);
  color: var(--text-light);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  color: var(--accent-color);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect authenticated users to dashboard or their intended destination
  useEffect(() => {
    if (isAuthenticated) {
      // Get the intended destination from location state or default to dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      // Call the actual login API using our utility
      const data = await authAPI.login({ email, password, role });
      
      // Save token to localStorage
      localStorage.setItem('token', data.token);
      
      // Login using context
      login(data.user);
      
      toast.success('Login successful!');
      // Navigate to the intended destination or dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.message || 'Invalid credentials');
    }
  };

  // If user is authenticated, don't render the login form
  if (isAuthenticated) {
    return null;
  }

  return (
    <LoginContainer>
      <Title>Login to CollegeHub</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="role">Role</Label>
          <select 
            id="role" 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={{
              padding: '0.75rem',
              borderRadius: 'var(--border-radius)',
              border: '1px solid #ccc',
              backgroundColor: 'var(--dark-bg)',
              color: 'var(--text-light)'
            }}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </FormGroup>
        
        <Button type="submit">Login</Button>
      </Form>
      
      <LinksContainer>
        <StyledLink to="/signup">Create Account</StyledLink>
        <StyledLink to="/">Forgot Password?</StyledLink>
      </LinksContainer>
    </LoginContainer>
  );
};

export default Login;