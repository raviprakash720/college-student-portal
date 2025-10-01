// Simple test script to demonstrate API functionality without database
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user data (in a real app, this would be in a database)
const mockUsers = [
  {
    id: 1,
    name: 'Test Student',
    email: 'student@example.com',
    password: '$2a$10$8K1p/a0dhrxiowP.dnkgNORTWgdEDHn5L2/xjpEWuC.QQv4rKO9jO', // password: "password"
    role: 'student'
  },
  {
    id: 2,
    name: 'Test Admin',
    email: 'admin@example.com',
    password: '$2a$10$8K1p/a0dhrxiowP.dnkgNORTWgdEDHn5L2/xjpEWuC.QQv4rKO9jO', // password: "password"
    role: 'admin'
  }
];

// JWT secret
const JWT_SECRET = 'test_secret_key';

// Routes
app.get('/', (req, res) => {
  res.send('College Portal API Test Server is running...');
});

// Register a new user
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // In a real app, we would hash the password here
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user (mock)
    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      password, // In a real app, this would be hashed
      role
    };

    mockUsers.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login user
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find user by email
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if role matches
    if (user.role !== role) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password (in a real app, we would use bcrypt)
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === 'password'; // Simplified for testing
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get user profile (protected route)
app.get('/api/users/profile', (req, res) => {
  // In a real implementation, you would verify the token here
  // For now, we'll just send a placeholder response
  res.json({ 
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: 'student'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Test API server is running on port ${PORT}`);
  console.log(`Mock users available:`);
  console.log(`- Student: student@example.com / password`);
  console.log(`- Admin: admin@example.com / password`);
});