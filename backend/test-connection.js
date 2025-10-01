// Simple test script to verify backend API is working
const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing backend API connection...');
    
    // Test root endpoint
    const response = await fetch('http://localhost:5000');
    const text = await response.text();
    
    console.log('API Response:', text);
    
    if (response.ok) {
      console.log('✅ Backend API is running successfully!');
    } else {
      console.log('❌ Backend API returned an error');
    }
  } catch (error) {
    console.log('❌ Failed to connect to backend API:', error.message);
    console.log('Please ensure the backend server is running on port 5000');
  }
}

testAPI();