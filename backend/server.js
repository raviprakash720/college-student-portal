const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/collegeportal';

console.log('Attempting to connect to MongoDB...');

mongoose.connect(MONGODB_URI, {
  // Remove deprecated options
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.log('MongoDB connection error:', err.message);
  console.log('Please ensure MongoDB is running or provide a valid MongoDB Atlas connection string in .env');
});

// Check connection status
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Routes
app.get('/', (req, res) => {
  res.send('College Portal API is running...');
});

// User routes
app.use('/api/users', require('./routes/userRoutes'));

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await mongoose.connection.close();
  server.close(() => {
    console.log('Process terminated');
  });
});