import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faSearch, faClipboardList, faCalculator, faComments, faCalendarAlt, faCertificate, faImages, faTable, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';

const DashboardContainer = styled.div`
  padding: 2rem 0;
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

const UserName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const UserRole = styled.p`
  margin: 0;
  opacity: 0.8;
`;

const LogoutButton = styled.button`
  background-color: var(--error-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  
  &:hover {
    opacity: 0.9;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureCard = styled(Link)<{ isDarkMode: boolean }>`
  background-color: ${props => props.isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
  border-radius: var(--border-radius);
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const FeatureTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
`;

const FeatureDescription = styled.p`
  margin: 0;
  opacity: 0.8;
`;

const QuickStats = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
`;

const StatCard = styled.div<{ isDarkMode: boolean }>`
  background-color: ${props => props.isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
  border-radius: var(--border-radius);
  padding: 1.5rem;
  text-align: center;
  flex: 1;
  min-width: 200px;
  box-shadow: var(--box-shadow);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  opacity: 0.8;
`;

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  
  // Mock data for quick stats
  const stats = [
    { label: 'Courses Enrolled', value: '5' },
    { label: 'Upcoming Events', value: '3' },
    { label: 'Forum Posts', value: '12' },
    { label: 'Certificates', value: '2' },
  ];

  // Feature items for the dashboard
  const features = [
    { 
      title: 'Course Materials', 
      description: 'Access lecture notes, assignments, and resources', 
      icon: faBook, 
      path: '/courses' 
    },
    { 
      title: 'Research Resources', 
      description: 'Curated links and academic databases', 
      icon: faSearch, 
      path: '/research' 
    },
    { 
      title: 'Quizzes & Tests', 
      description: 'Practice tests with auto-grading', 
      icon: faClipboardList, 
      path: '/quizzes' 
    },
    { 
      title: 'Grade Calculator', 
      description: 'Calculate GPA and track academic progress', 
      icon: faCalculator, 
      path: '/grades' 
    },
    { 
      title: 'Discussion Forum', 
      description: 'Ask questions and connect with peers', 
      icon: faComments, 
      path: '/forum' 
    },
    { 
      title: 'Event Calendar', 
      description: 'Upcoming lectures, workshops, and events', 
      icon: faCalendarAlt, 
      path: '/events' 
    },
    { 
      title: 'Workshops', 
      description: 'Register for certifications and workshops', 
      icon: faCertificate, 
      path: '/workshops' 
    },
    { 
      title: 'Gallery', 
      description: 'Photos and videos from college events', 
      icon: faImages, 
      path: '/gallery' 
    },
    { 
      title: 'Timetable', 
      description: 'Generate and export your weekly schedule', 
      icon: faTable, 
      path: '/timetable' 
    },
    { 
      title: 'Portfolio', 
      description: 'Build your professional profile', 
      icon: faUser, 
      path: '/portfolio' 
    },
  ];

  return (
    <DashboardContainer>
      <WelcomeSection>
        <Title>Welcome to CollegeHub</Title>
        <Subtitle>Your one-stop portal for all academic and campus life resources</Subtitle>
      </WelcomeSection>
      
      {user && (
        <UserInfo>
          <UserDetails>
            <UserAvatar>
              {user.name.charAt(0)}
            </UserAvatar>
            <div>
              <UserName>{user.name}</UserName>
              <UserRole>{user.role === 'admin' ? 'Administrator' : 'Student'}</UserRole>
            </div>
          </UserDetails>
          <LogoutButton onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </LogoutButton>
        </UserInfo>
      )}

      <QuickStats>
        {stats.map((stat, index) => (
          <StatCard key={index} isDarkMode={true}>
            <StatNumber>{stat.value}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </QuickStats>

      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index} to={feature.path} isDarkMode={true}>
            <FeatureIcon>
              <FontAwesomeIcon icon={feature.icon} />
            </FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </DashboardContainer>
  );
};

export default Dashboard;