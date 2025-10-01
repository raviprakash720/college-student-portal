# Deployment Guide

This guide explains how to deploy the College Student Portal application to various hosting platforms.

## Prerequisites

1. Node.js (version 16 or higher)
2. Git
3. A GitHub account
4. A hosting platform account (Netlify, Vercel, or similar)

## GitHub Repository Setup

1. Create a new repository on GitHub:
   - Go to https://github.com and log in
   - Click the "+" icon and select "New repository"
   - Name it "college-student-portal"
   - Add a description (optional)
   - Choose public or private
   - Do NOT initialize with a README
   - Click "Create repository"

2. Push the code to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/college-student-portal.git
   git push -u origin main
   ```

## Frontend Deployment Options

### Option 1: GitHub Pages (Recommended)

1. Update `vite.config.js`:
   - Change the `base` path to match your repository name:
   ```javascript
   base: '/your-repository-name/',
   ```

2. Configure GitHub Pages:
   - Go to your repository settings on GitHub
   - Scroll down to the "Pages" section
   - Under "Source", select "GitHub Actions"
   - The site will automatically deploy on every push to the main branch

3. Set environment variables (optional):
   - If you have a custom backend, you can set the `VITE_API_URL` in the GitHub Actions workflow

### Option 2: Netlify

1. Go to https://netlify.com and sign up/sign in
2. Click "New site from Git"
3. Connect to GitHub and select your repository
4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

### Option 3: Vercel

1. Go to https://vercel.com and sign up/sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
5. Click "Deploy"

## Backend Deployment

The backend needs to be deployed separately since GitHub Pages only serves static files.

### Option 1: Render (Recommended)

1. Go to https://render.com and sign up/sign in
2. Click "New Web Service"
3. Connect to GitHub and select your repository
4. Configure the service:
   - Name: college-student-portal-backend
   - Environment: Node
   - Build command: `npm install`
   - Start command: `npm start`
   - Root directory: `backend`
5. Add environment variables:
   - PORT: 5000
   - MONGODB_URI: your MongoDB connection string
   - JWT_SECRET: your JWT secret
6. Click "Create Web Service"

### Option 2: Heroku

1. Install the Heroku CLI
2. Log in to Heroku:
   ```bash
   heroku login
   ```

3. Create a new app:
   ```bash
   heroku create your-app-name
   ```

4. Set the root directory for the backend:
   ```bash
   heroku config:set PROJECT_PATH=backend
   ```

5. Deploy:
   ```bash
   git subtree push --prefix backend heroku main
   ```

## Environment Variables

For production, you'll need to set these environment variables:

### Frontend:
- `VITE_API_URL`: The URL of your backend API (e.g., https://your-backend-url.com/api)

### Backend:
- `PORT`: The port to run the server on (default: 5000)
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secret key for JWT token generation

## Database Setup

1. Sign up for MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add a database user
4. Add your IP address to the IP whitelist (or allow access from anywhere for development)
5. Get the connection string and replace placeholders with your credentials

## Continuous Deployment

Once set up, any changes pushed to the main branch will automatically trigger a new deployment on most platforms.

## Troubleshooting

### Common Issues:

1. **Site not loading**: Check that the `base` path in `vite.config.js` matches your repository name
2. **API calls failing**: Ensure your backend is deployed and the `VITE_API_URL` is correctly set
3. **Build failures**: Check that all dependencies are correctly listed in package.json
4. **Environment variables not set**: Make sure all required environment variables are configured in your hosting platform
5. **CORS errors**: Ensure your backend is configured to accept requests from your frontend domain
6. **Database connection issues**: Verify your MongoDB connection string and IP whitelist settings

### Checking Logs:

Most hosting platforms provide access to application logs which can help diagnose issues:
- GitHub Actions: Repository → Actions → Select workflow run
- Netlify: Deploy settings → Functions → Logs
- Vercel: Deployment → Functions → View Logs
- Render: Dashboard → Your service → Logs
- Heroku: `heroku logs --tail`

## Updating the Application

To update your deployed application:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
3. The hosting platform will automatically detect the changes and start a new deployment

## Best Practices

1. Always test your application locally before deploying
2. Use environment variables for sensitive information
3. Keep your dependencies up to date
4. Monitor your application's performance and error logs
5. Set up monitoring and alerting for critical issues