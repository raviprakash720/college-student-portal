import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import page components (we'll create these later)
import Dashboard from './components/Dashboard';
import CourseMaterials from './components/CourseMaterials';
import ResearchResources from './components/ResearchResources';
import Quizzes from './components/Quizzes';
import GradeCalculator from './components/GradeCalculator';
import DiscussionForum from './components/DiscussionForum';
import EventCalendar from './components/EventCalendar';
import Workshops from './components/Workshops';
import Gallery from './components/Gallery';
import TimetableGenerator from './components/TimetableGenerator';
import PortfolioBuilder from './components/PortfolioBuilder';
import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Global styles
const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #4361ee;
    --secondary-color: #3f37c9;
    --accent-color: #4cc9f0;
    --success-color: #4ade80;
    --warning-color: #facc15;
    --error-color: #f87171;
    --dark-bg: #1a1a2e;
    --dark-card: #16213e;
    --light-bg: #f8f9fa;
    --light-card: #ffffff;
    --text-dark: #0f172a;
    --text-light: #f1f5f9;
    --border-radius: 8px;
    --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: var(--transition);
  }

  * {
    box-sizing: border-box;
  }
`;

// Styled components for layout
const LayoutContainer = styled.div<{ isDarkMode: boolean }>`  
  min-height: 100vh;
  background-color: ${props => props.isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'};
  color: ${props => props.isDarkMode ? 'var(--text-light)' : 'var(--text-dark)'};
  transition: var(--transition);
`;

const Header = styled.header<{ isDarkMode: boolean }>`
  background-color: ${props => props.isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
  box-shadow: var(--box-shadow);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: var(--transition);
`;

const Logo = styled.h1`
  margin: 0;
  color: var(--primary-color);
  font-size: 1.8rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ isDarkMode: boolean }>`
  text-decoration: none;
  color: ${props => props.isDarkMode ? 'var(--text-light)' : 'var(--text-dark)'};
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  
  &:hover {
    background-color: ${props => props.isDarkMode ? 'rgba(67, 97, 238, 0.2)' : 'rgba(67, 97, 238, 0.1)'};
    color: var(--primary-color);
  }
`;

const MobileMenuButton = styled.button<{ isDarkMode: boolean }>`
  background: none;
  border: none;
  color: ${props => props.isDarkMode ? 'var(--text-light)' : 'var(--text-dark)'};
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const DarkModeToggle = styled.button<{ isDarkMode: boolean }>`
  background: ${props => props.isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
  border: 1px solid ${props => props.isDarkMode ? 'var(--text-light)' : 'var(--text-dark)'};
  color: ${props => props.isDarkMode ? 'var(--text-light)' : 'var(--text-dark)'};
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Footer = styled.footer<{ isDarkMode: boolean }>`
  background-color: ${props => props.isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
  padding: 2rem;
  text-align: center;
  margin-top: auto;
`;

// Header component that uses auth context
const AppHeader: React.FC<{ isDarkMode: boolean; toggleDarkMode: () => void; toggleMenu: () => void }> = ({ 
  isDarkMode, 
  toggleDarkMode, 
  toggleMenu 
}) => {
  const { isAuthenticated } = useAuth();
  
  // Navigation items for authenticated users
  const authNavItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Courses', path: '/courses' },
    { name: 'Research', path: '/research' },
    { name: 'Quizzes', path: '/quizzes' },
    { name: 'Grades', path: '/grades' },
    { name: 'Forum', path: '/forum' },
    { name: 'Events', path: '/events' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Timetable', path: '/timetable' },
    { name: 'Portfolio', path: '/portfolio' },
  ];
  
  // Navigation items for unauthenticated users
  const unauthNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
    { name: 'Sign Up', path: '/signup' },
  ];

  const navItems = isAuthenticated ? authNavItems : unauthNavItems;

  return (
    <Header isDarkMode={isDarkMode}>
      <Logo>CollegeHub</Logo>
      <Nav>
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            isDarkMode={isDarkMode}
          >
            {item.name}
          </NavLink>
        ))}
      </Nav>
      <div>
        <DarkModeToggle onClick={toggleDarkMode} isDarkMode={isDarkMode}>
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </DarkModeToggle>
        <MobileMenuButton onClick={toggleMenu} isDarkMode={isDarkMode}>
          ☰
        </MobileMenuButton>
      </div>
    </Header>
  );
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ThemeProvider theme={{ isDarkMode }}>
      <Router>
        <AuthProvider>
          <GlobalStyle />
          <LayoutContainer isDarkMode={isDarkMode}>
            <AppHeader 
              isDarkMode={isDarkMode} 
              toggleDarkMode={toggleDarkMode} 
              toggleMenu={toggleMenu} 
            />
            
            <MainContent>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/courses" element={
                  <ProtectedRoute>
                    <CourseMaterials />
                  </ProtectedRoute>
                } />
                <Route path="/research" element={
                  <ProtectedRoute>
                    <ResearchResources />
                  </ProtectedRoute>
                } />
                <Route path="/quizzes" element={
                  <ProtectedRoute>
                    <Quizzes />
                  </ProtectedRoute>
                } />
                <Route path="/grades" element={
                  <ProtectedRoute>
                    <GradeCalculator />
                  </ProtectedRoute>
                } />
                <Route path="/forum" element={
                  <ProtectedRoute>
                    <DiscussionForum />
                  </ProtectedRoute>
                } />
                <Route path="/events" element={
                  <ProtectedRoute>
                    <EventCalendar />
                  </ProtectedRoute>
                } />
                <Route path="/workshops" element={
                  <ProtectedRoute>
                    <Workshops />
                  </ProtectedRoute>
                } />
                <Route path="/gallery" element={
                  <ProtectedRoute>
                    <Gallery />
                  </ProtectedRoute>
                } />
                <Route path="/timetable" element={
                  <ProtectedRoute>
                    <TimetableGenerator />
                  </ProtectedRoute>
                } />
                <Route path="/portfolio" element={
                  <ProtectedRoute>
                    <PortfolioBuilder />
                  </ProtectedRoute>
                } />
              </Routes>
            </MainContent>
            
            <Footer isDarkMode={isDarkMode}>
              <p>© 2025 CollegeHub - Student Portal</p>
            </Footer>
          </LayoutContainer>
          <ToastContainer />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;