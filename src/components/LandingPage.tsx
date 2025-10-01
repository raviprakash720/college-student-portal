import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBook, faUsers, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';

const LandingContainer = styled.div`
  padding: 2rem 0;
  text-align: center;
`;

const HeroSection = styled.div`
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  opacity: 0.8;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
  transition: var(--transition);
  margin: 0 1rem;
  
  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-3px);
  }
`;

const FeaturesSection = styled.div`
  margin: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--primary-color);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureCard = styled.div<{ isDarkMode: boolean }>`
  background-color: ${props => props.isDarkMode ? 'var(--dark-card)' : 'var(--light-card)'};
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  
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
  font-size: 1.5rem;
`;

const FeatureDescription = styled.p`
  margin: 0;
  opacity: 0.8;
`;

const TestimonialsSection = styled.div`
  margin: 4rem 0;
  background-color: var(--dark-card);
  padding: 3rem;
  border-radius: var(--border-radius);
`;

const Testimonial = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  text-align: left;
`;

const Quote = styled.p`
  font-style: italic;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Author = styled.p`
  font-weight: bold;
  text-align: right;
`;

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const features = [
    {
      icon: faGraduationCap,
      title: 'Academic Resources',
      description: 'Access course materials, lecture notes, and study guides all in one place.'
    },
    {
      icon: faBook,
      title: 'Research Tools',
      description: 'Curated databases and research resources to support your academic work.'
    },
    {
      icon: faUsers,
      title: 'Community Forum',
      description: 'Connect with peers, ask questions, and share knowledge in our discussion forums.'
    },
    {
      icon: faCalendarAlt,
      title: 'Event Management',
      description: 'Stay updated with campus events, workshops, and important academic dates.'
    }
  ];

  // If user is authenticated, don't render the landing page content
  if (isAuthenticated) {
    return null;
  }

  return (
    <LandingContainer>
      <HeroSection>
        <Title>Welcome to CollegeHub</Title>
        <Subtitle>Your all-in-one platform for academic success and campus life</Subtitle>
        <div>
          <CTAButton to="/signup">Get Started</CTAButton>
          <CTAButton to="/login">Login</CTAButton>
        </div>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Why Choose CollegeHub?</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index} isDarkMode={true}>
              <FeatureIcon>
                <FontAwesomeIcon icon={feature.icon} />
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <TestimonialsSection>
        <SectionTitle>What Students Say</SectionTitle>
        <Testimonial>
          <Quote>
            "CollegeHub has completely transformed how I manage my academic life. 
            Everything I need is in one place, and I can access it from anywhere!"
          </Quote>
          <Author>- Sarah Johnson, Computer Science Major</Author>
        </Testimonial>
        <Testimonial>
          <Quote>
            "The discussion forums have been invaluable for connecting with classmates 
            and getting help with difficult concepts. Highly recommended!"
          </Quote>
          <Author>- Michael Chen, Engineering Student</Author>
        </Testimonial>
      </TestimonialsSection>
    </LandingContainer>
  );
};

export default LandingPage;