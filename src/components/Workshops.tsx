import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faChalkboardTeacher, faCalendarAlt, faClock, faMapMarkerAlt, faUsers, faSearch, faFilter, faStar } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 2rem 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const Title = styled.h1`
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 0.5rem;
  flex: 1;
  max-width: 500px;
`;

const SearchInput = styled.input`
  padding: 0.75rem;
  border-radius: var(--border-radius);
  border: 1px solid #ccc;
  background-color: var(--dark-bg);
  color: var(--text-light);
  flex: 1;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--text-light)'};
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--secondary-color)' : 'rgba(67, 97, 238, 0.1)'};
  }
`;

const SortSelect = styled.select`
  padding: 0.75rem;
  border-radius: var(--border-radius);
  border: 1px solid #ccc;
  background-color: var(--dark-bg);
  color: var(--text-light);
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const WorkshopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const WorkshopCard = styled.div`
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const WorkshopImage = styled.div<{ color: string }>`
  height: 180px;
  background-color: ${props => `var(--${props.color}-color)`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
`;

const WorkshopContent = styled.div`
  padding: 1.5rem;
`;

const WorkshopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const WorkshopTitle = styled.h3`
  margin: 0;
  color: var(--text-light);
  font-size: 1.4rem;
`;

const WorkshopRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--warning-color);
  font-weight: bold;
`;

const WorkshopDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const WorkshopDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-light);
`;

const DetailLabel = styled.span`
  min-width: 100px;
  color: var(--accent-color);
  font-weight: 500;
`;

const WorkshopActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RegisterButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const ViewDetailsButton = styled.button`
  background: none;
  border: none;
  color: var(--accent-color);
  cursor: pointer;
  font-weight: 500;
  transition: var(--transition);
  
  &:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }
`;

const UpcomingSection = styled.div`
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UpcomingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UpcomingItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(67, 97, 238, 0.1);
  }
`;

const UpcomingDate = styled.div`
  min-width: 80px;
  text-align: center;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
  padding: 0.5rem;
`;

const UpcomingMonth = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const UpcomingDay = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const UpcomingInfo = styled.div`
  flex: 1;
`;

const UpcomingTitle = styled.h4`
  margin: 0 0 0.25rem 0;
  color: var(--text-light);
`;

const UpcomingTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-color);
  font-size: 0.9rem;
`;

const FeaturedBadge = styled.span`
  background-color: var(--warning-color);
  color: var(--text-dark);
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
  font-size: 0.8rem;
  font-weight: bold;
  margin-left: 0.5rem;
`;

const Workshops: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Categories for workshops
  const categories = [
    { id: 'all', name: 'All Workshops', icon: faFilter },
    { id: 'tech', name: 'Technology', icon: faLaptopCode },
    { id: 'business', name: 'Business', icon: faChalkboardTeacher },
    { id: 'design', name: 'Design', icon: faStar },
    { id: 'career', name: 'Career Development', icon: faUsers }
  ];

  // Mock data for workshops
  const workshops = [
    {
      id: 1,
      title: 'Advanced React Development',
      category: 'tech',
      date: new Date(2025, 10, 5),
      time: '2:00 PM - 5:00 PM',
      location: 'Computer Lab 3',
      attendees: 40,
      maxAttendees: 50,
      instructor: 'Dr. Sarah Johnson',
      rating: 4.8,
      description: 'Deep dive into advanced React concepts including hooks, context API, and performance optimization techniques.',
      color: 'primary'
    },
    {
      id: 2,
      title: 'Digital Marketing Strategy',
      category: 'business',
      date: new Date(2025, 10, 8),
      time: '10:00 AM - 1:00 PM',
      location: 'Seminar Hall A',
      attendees: 35,
      maxAttendees: 40,
      instructor: 'Prof. Michael Chen',
      rating: 4.6,
      description: 'Comprehensive workshop on modern digital marketing strategies, SEO, social media marketing, and analytics.',
      color: 'accent'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      category: 'design',
      date: new Date(2025, 10, 12),
      time: '3:00 PM - 6:00 PM',
      location: 'Design Studio',
      attendees: 28,
      maxAttendees: 30,
      instructor: 'Ms. Priya Sharma',
      rating: 4.9,
      description: 'Hands-on workshop covering fundamental UI/UX design principles, prototyping, and user research techniques.',
      color: 'success'
    },
    {
      id: 4,
      title: 'Career Planning & Resume Writing',
      category: 'career',
      date: new Date(2025, 10, 15),
      time: '11:00 AM - 1:00 PM',
      location: 'Career Counseling Center',
      attendees: 60,
      maxAttendees: 75,
      instructor: 'Mr. Robert Williams',
      rating: 4.7,
      description: 'Expert guidance on career planning, resume writing, interview preparation, and job search strategies.',
      color: 'warning'
    },
    {
      id: 5,
      title: 'Machine Learning Fundamentals',
      category: 'tech',
      date: new Date(2025, 10, 18),
      time: '4:00 PM - 7:00 PM',
      location: 'Computer Lab 1',
      attendees: 45,
      maxAttendees: 50,
      instructor: 'Dr. James Wilson',
      rating: 4.9,
      description: 'Introduction to machine learning concepts, algorithms, and practical applications using Python.',
      color: 'primary'
    },
    {
      id: 6,
      title: 'Entrepreneurship & Startup Basics',
      category: 'business',
      date: new Date(2025, 10, 22),
      time: '9:00 AM - 12:00 PM',
      location: 'Main Auditorium',
      attendees: 80,
      maxAttendees: 100,
      instructor: 'Ms. Lisa Anderson',
      rating: 4.5,
      description: 'Learn the fundamentals of starting your own business, from ideation to funding and scaling.',
      color: 'accent'
    }
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Silver Jubilee Celebration',
      date: new Date(2025, 9, 20),
      time: '9:00 AM - 5:00 PM'
    },
    {
      id: 2,
      title: 'Udbhav 2025 - Cultural Fest',
      date: new Date(2025, 9, 25),
      time: '10:00 AM - 8:00 PM'
    },
    {
      id: 3,
      title: 'INNOQUEST 2025 Hackathon',
      date: new Date(2025, 9, 28),
      time: '9:00 AM - 6:00 PM'
    },
    {
      id: 4,
      title: 'Career Fair 2025',
      date: new Date(2025, 10, 10),
      time: '10:00 AM - 4:00 PM'
    }
  ];

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         workshop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || workshop.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.date.getTime() - b.date.getTime();
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'popularity') {
      return b.attendees - a.attendees;
    }
    return 0;
  });

  return (
    <Container>
      <Header>
        <Title>
          <FontAwesomeIcon icon={faChalkboardTeacher} /> Workshops & Events
        </Title>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search workshops, instructors..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </Header>

      <Controls>
        <Filters>
          {categories.map(category => (
            <FilterButton
              key={category.id}
              active={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              <FontAwesomeIcon icon={category.icon} />
              {category.name}
            </FilterButton>
          ))}
        </Filters>
        <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="rating">Sort by Rating</option>
          <option value="popularity">Sort by Popularity</option>
        </SortSelect>
      </Controls>

      <WorkshopGrid>
        {filteredWorkshops.map(workshop => (
          <WorkshopCard key={workshop.id}>
            <WorkshopImage color={workshop.color}>
              <FontAwesomeIcon 
                icon={
                  workshop.category === 'tech' ? faLaptopCode :
                  workshop.category === 'business' ? faChalkboardTeacher :
                  workshop.category === 'design' ? faStar :
                  faUsers
                } 
              />
            </WorkshopImage>
            <WorkshopContent>
              <WorkshopHeader>
                <WorkshopTitle>
                  {workshop.title}
                  {workshop.rating >= 4.8 && <FeaturedBadge>Featured</FeaturedBadge>}
                </WorkshopTitle>
                <WorkshopRating>
                  <FontAwesomeIcon icon={faStar} />
                  {workshop.rating}
                </WorkshopRating>
              </WorkshopHeader>
              
              <WorkshopDescription>
                {workshop.description}
              </WorkshopDescription>
              
              <WorkshopDetails>
                <DetailItem>
                  <DetailLabel>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </DetailLabel>
                  {workshop.date.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>
                    <FontAwesomeIcon icon={faClock} />
                  </DetailLabel>
                  {workshop.time}
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </DetailLabel>
                  {workshop.location}
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>
                    <FontAwesomeIcon icon={faChalkboardTeacher} />
                  </DetailLabel>
                  {workshop.instructor}
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>
                    <FontAwesomeIcon icon={faUsers} />
                  </DetailLabel>
                  {workshop.attendees}/{workshop.maxAttendees} seats filled
                </DetailItem>
              </WorkshopDetails>
              
              <WorkshopActions>
                <RegisterButton>Register Now</RegisterButton>
                <ViewDetailsButton>View Details</ViewDetailsButton>
              </WorkshopActions>
            </WorkshopContent>
          </WorkshopCard>
        ))}
      </WorkshopGrid>

      <UpcomingSection>
        <SectionTitle>
          <FontAwesomeIcon icon={faCalendarAlt} /> Upcoming College Events
        </SectionTitle>
        <UpcomingList>
          {upcomingEvents.map(event => (
            <UpcomingItem key={event.id}>
              <UpcomingDate>
                <UpcomingMonth>
                  {event.date.toLocaleDateString('en-US', { month: 'short' })}
                </UpcomingMonth>
                <UpcomingDay>
                  {event.date.getDate()}
                </UpcomingDay>
              </UpcomingDate>
              <UpcomingInfo>
                <UpcomingTitle>{event.title}</UpcomingTitle>
                <UpcomingTime>
                  <FontAwesomeIcon icon={faClock} />
                  {event.time}
                </UpcomingTime>
              </UpcomingInfo>
            </UpcomingItem>
          ))}
        </UpcomingList>
      </UpcomingSection>
    </Container>
  );
};

export default Workshops;