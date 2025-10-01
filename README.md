# College Student Portal with Database Integration

This project demonstrates how to connect the student portal frontend to a backend with database integration.

## Project Structure

```
college/
├── student-portal/     # React frontend
└── backend/            # Node.js + Express backend
```

## Features

- User registration and login with JWT authentication
- Password hashing for security
- Role-based access (student/admin)
- Responsive design with dark/light mode
- Complete student portal with multiple components
- Landing page for unauthenticated users
- Protected routes that require authentication
- Automatic redirect to login for protected pages
- **Only real users can login - fake emails are rejected**

## Setup Instructions

### 1. Frontend Setup

1. Navigate to the student-portal directory:
   ```
   cd student-portal
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### 2. Backend Setup

You have two options for running the backend:

#### Option 1: Full Backend with MongoDB (Production)

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

#### Option 2: Test Backend (Development)

For development and testing purposes, we've provided a test backend that doesn't require a database:

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Run the test API server:
   ```
   node test-api.js
   ```

### 3. Database Setup

This project uses MongoDB as the database. You have two options:

#### Option 1: Local MongoDB Installation

1. Install MongoDB Community Edition on your system
2. Start the MongoDB service
3. The application will automatically connect to `mongodb://localhost:27017/collegeportal`

#### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `.env` file in the backend directory with your connection string:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   ```

## API Endpoints

### User Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/collegeportal
JWT_SECRET=your_jwt_secret_key
```

## Running the Application

### For Development (using test API):

1. Start the test backend server:
   ```
   cd backend
   node test-api.js
   ```

2. Start the frontend:
   ```
   cd student-portal
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### For Production (with real database):

1. Make sure MongoDB is running
2. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

3. Start the frontend:
   ```
   cd student-portal
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Test Credentials

When using the test API server, you can use these credentials:

- Student: student@example.com / password
- Admin: admin@example.com / password

**Note: Only these specific email addresses will work. Any other email will be rejected with "Invalid credentials".**

## Technologies Used

### Frontend
- React with TypeScript
- Styled Components
- React Router
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Bcrypt.js for password hashing