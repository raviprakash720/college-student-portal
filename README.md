# College Student Portal

A comprehensive web application for college students featuring gallery, events, workshops, and discussion forums. Built with React, TypeScript, and Node.js.

![GitHub](https://img.shields.io/github/license/your-username/college-student-portal)
![GitHub top language](https://img.shields.io/github/languages/top/your-username/college-student-portal)
![GitHub last commit](https://img.shields.io/github/last-commit/your-username/college-student-portal)

## Features

### 🎓 Academic Portal
- **Dashboard** - Personalized student dashboard with quick access to all features
- **Course Materials** - Access lecture notes, assignments, and resources
- **Research Resources** - Curated links and academic databases
- **Grade Calculator** - Calculate GPA and track academic progress

### 📅 Events & Activities
- **Event Calendar** - Monthly view of all college events with detailed information
- **Gallery** - Photo and video gallery of college events, activities, and celebrations
- **Workshops** - Upcoming workshops and professional development opportunities

### 🤝 Community Features
- **Discussion Forum** - Ask questions, share knowledge, and connect with peers
- **Quizzes** - Practice tests with auto-grading
- **Portfolio Builder** - Create and showcase your academic and professional portfolio

### 🛠️ Tools & Utilities
- **Timetable Generator** - Create and export your weekly schedule
- **Dark/Light Theme** - Toggle between dark and light modes for comfortable viewing

## Tech Stack

### Frontend
- [React](https://reactjs.org/) with TypeScript
- [Vite](https://vitejs.dev/) for fast development and building
- [Styled Components](https://styled-components.com/) for styling
- [React Router](https://reactrouter.com/) for navigation
- [Font Awesome](https://fontawesome.com/) for icons

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/) for REST API
- [MongoDB](https://www.mongodb.com/) with Mongoose ODM
- [JSON Web Tokens](https://jwt.io/) for authentication

## Screenshots

![Dashboard](screenshots/dashboard.png)
*Personalized student dashboard*

![Gallery](screenshots/gallery.png)
*Event gallery with photo viewer*

![Calendar](screenshots/calendar.png)
*Interactive event calendar*

![Forum](screenshots/forum.png)
*Discussion forum with categorized topics*

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/college-student-portal.git
   cd college-student-portal
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. Create environment files:
   - Create `.env` in the backend directory with:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```

### Development

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
college-student-portal/
├── backend/              # Node.js backend API
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── server.js         # Entry point
├── src/                  # React frontend
│   ├── components/       # React components
│   ├── contexts/         # React contexts
│   ├── utils/            # Utility functions
│   └── App.tsx           # Main application component
├── public/               # Static assets
├── dist/                 # Built files (generated)
└── screenshots/          # Documentation screenshots
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run test-api` - Start test API server (no database required)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing development experience
- [Font Awesome](https://fontawesome.com/) for the icons
- [date-fns](https://date-fns.org/) for date manipulation
- All the open-source libraries that made this project possible

## Support

If you have any questions or need help, please [open an issue](https://github.com/your-username/college-student-portal/issues/new).