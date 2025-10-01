import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../utils/api';

const SignupContainer = styled.div`
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
  text-align: center;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  color: var(--accent-color);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      // Call the actual register API using our utility
      const data = await authAPI.register({ name, email, password, role });
      
      // Save token to localStorage
      localStorage.setItem('token', data.token);
      
      // Login using context
      login(data.user);
      
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    }
  };

  // If user is authenticated, don't render the signup form
  if (isAuthenticated) {
    return null;
  }

  return (
    <SignupContainer>
      <Title>Create Account</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </FormGroup>
        
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
            placeholder="Create a password"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
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
        
        <Button type="submit">Sign Up</Button>
      </Form>
      
      <LinksContainer>
        <StyledLink to="/login">Already have an account? Login</StyledLink>
      </LinksContainer>
    </SignupContainer>
  );
};

export default Signup;