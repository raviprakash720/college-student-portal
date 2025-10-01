import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faSearch, faHeart, faComment, faShare, faTimes, faChevronLeft, faChevronRight, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

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

const Filters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
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
  
  &:hover {
    background-color: ${props => props.active ? 'var(--secondary-color)' : 'rgba(67, 97, 238, 0.1)'};
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const MediaItem = styled.div`
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const MediaImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: var(--transition);
`;

const MediaInfo = styled.div`
  padding: 1.5rem;
  background-color: var(--dark-card);
`;

const MediaTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: var(--text-light);
  font-size: 1.2rem;
`;

const MediaDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-color);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const MediaDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const MediaStats = styled.div`
  display: flex;
  gap: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const Lightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const LightboxContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: var(--border-radius);
`;

const LightboxClose = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: var(--error-color);
  }
`;

const LightboxNav = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const LightboxPrev = styled(LightboxNav)`
  left: 1rem;
`;

const LightboxNext = styled(LightboxNav)`
  right: 1rem;
`;

const LightboxInfo = styled.div`
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 800px;
`;

const LightboxTitle = styled.h2`
  margin: 0 0 0.5rem 0;
  color: var(--text-light);
`;

const LightboxDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
`;

const LightboxDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const LightboxActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LightboxStats = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const LightboxStat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Gallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);

  // Categories for gallery items
  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'annual-day', name: 'Annual Day' },
    { id: 'sports', name: 'Sports Events' },
    { id: 'cultural', name: 'Cultural Fest' },
    { id: 'tech', name: 'Tech Fest' },
    { id: 'workshop', name: 'Workshops' },
    { id: 'graduation', name: 'Graduation' },
    { id: 'alumni', name: 'Alumni Meet' }
  ];

  // Enhanced mock data for gallery items with more realistic college events
  const mediaItems = [
    {
      id: 1,
      title: 'Silver Jubilee Celebration',
      category: 'annual-day',
      date: '2025-09-20',
      description: 'Grand celebration marking 25 years of excellence in education with performances from students and alumni.',
      likes: 342,
      comments: 87,
      src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      title: 'Udbhav 2025 - Annual Cultural Fest',
      category: 'cultural',
      date: '2025-02-15',
      description: 'Three-day cultural extravaganza featuring dance, music, drama, and art competitions with participation from 15 colleges.',
      likes: 428,
      comments: 112,
      src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      title: 'INNOQUEST 2025 Hackathon',
      category: 'tech',
      date: '2025-08-30',
      description: '24-hour hackathon with 150 participants working on innovative solutions for real-world problems.',
      likes: 297,
      comments: 64,
      src: 'https://images.unsplash.com/photo-1532634922-8fe0b6fb2f26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 4,
      title: 'Inter-College Basketball Championship',
      category: 'sports',
      date: '2025-09-05',
      description: 'Exciting finals of the annual basketball tournament with VJIT emerging as champions after a thrilling match.',
      likes: 215,
      comments: 43,
      src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 5,
      title: 'AI in Healthcare Guest Lecture',
      category: 'workshop',
      date: '2025-09-20',
      description: 'Distinguished speaker from Microsoft discussing the applications of AI in modern healthcare systems.',
      likes: 187,
      comments: 32,
      src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 6,
      title: 'Graduation Day 2025',
      category: 'graduation',
      date: '2025-08-20',
      description: 'Proud moment as 850 students graduate with their degrees, marking the beginning of their professional journey.',
      likes: 512,
      comments: 156,
      src: 'https://images.unsplash.com/photo-1509062522246-375596ef7f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 7,
      title: 'Alumni Meet 2025',
      category: 'alumni',
      date: '2025-01-10',
      description: 'Successful alumni meet with over 500 graduates attending, sharing their experiences and networking with current students.',
      likes: 198,
      comments: 47,
      src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 8,
      title: 'Robotics Workshop',
      category: 'workshop',
      date: '2025-07-15',
      description: 'Hands-on workshop on building autonomous robots with participation from engineering students across departments.',
      likes: 165,
      comments: 38,
      src: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 9,
      title: 'Bathukamma Festival',
      category: 'cultural',
      date: '2025-09-30',
      description: 'Traditional floral festival celebrated by women students showcasing cultural heritage and unity.',
      likes: 276,
      comments: 69,
      src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 10,
      title: 'Campus Recruitment Drive',
      category: 'annual-day',
      date: '2025-10-05',
      description: 'Major recruitment drive with 25 companies visiting campus, resulting in 180+ job offers to final year students.',
      likes: 234,
      comments: 52,
      src: 'https://images.unsplash.com/photo-1521537634881-111ecb2489f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 11,
      title: 'NSS Community Service Camp',
      category: 'annual-day',
      date: '2025-06-15',
      description: 'Two-week community service camp organized by NSS volunteers in rural areas for educational and health awareness.',
      likes: 156,
      comments: 31,
      src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 12,
      title: 'Department Tech Talks',
      category: 'tech',
      date: '2025-05-20',
      description: 'Series of technical talks by industry experts from various departments showcasing student projects and innovations.',
      likes: 189,
      comments: 44,
      src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const openLightbox = (id: number) => {
    setSelectedMedia(id);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const navigateMedia = (direction: 'prev' | 'next') => {
    if (selectedMedia === null) return;
    
    const currentIndex = filteredMedia.findIndex(item => item.id === selectedMedia);
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredMedia.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredMedia.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedMedia(filteredMedia[newIndex].id);
  };

  const selectedMediaItem = selectedMedia 
    ? filteredMedia.find(item => item.id === selectedMedia) 
    : null;

  return (
    <Container>
      <Header>
        <Title>
          <FontAwesomeIcon icon={faImages} /> College Events Gallery
        </Title>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search events, activities..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </Header>

      <Filters>
        {categories.map(category => (
          <FilterButton
            key={category.id}
            active={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </FilterButton>
        ))}
      </Filters>

      <GalleryGrid>
        {filteredMedia.map(item => (
          <MediaItem key={item.id} onClick={() => openLightbox(item.id)}>
            <MediaImage src={item.src} alt={item.title} />
            <MediaInfo>
              <MediaTitle>{item.title}</MediaTitle>
              <MediaDate>
                <FontAwesomeIcon icon={faCalendarAlt} />
                {new Date(item.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </MediaDate>
              <MediaDescription>{item.description}</MediaDescription>
              <MediaStats>
                <Stat>
                  <FontAwesomeIcon icon={faHeart} />
                  {item.likes}
                </Stat>
                <Stat>
                  <FontAwesomeIcon icon={faComment} />
                  {item.comments}
                </Stat>
              </MediaStats>
            </MediaInfo>
          </MediaItem>
        ))}
      </GalleryGrid>

      {selectedMediaItem && (
        <Lightbox>
          <LightboxContent>
            <LightboxImage src={selectedMediaItem.src} alt={selectedMediaItem.title} />
            <LightboxClose onClick={closeLightbox}>
              <FontAwesomeIcon icon={faTimes} />
            </LightboxClose>
            <LightboxPrev onClick={() => navigateMedia('prev')}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </LightboxPrev>
            <LightboxNext onClick={() => navigateMedia('next')}>
              <FontAwesomeIcon icon={faChevronRight} />
            </LightboxNext>
            <LightboxInfo>
              <LightboxTitle>{selectedMediaItem.title}</LightboxTitle>
              <LightboxDate>
                <FontAwesomeIcon icon={faCalendarAlt} />
                {new Date(selectedMediaItem.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </LightboxDate>
              <LightboxDescription>{selectedMediaItem.description}</LightboxDescription>
              <LightboxActions>
                <LightboxStats>
                  <LightboxStat>
                    <FontAwesomeIcon icon={faHeart} />
                    {selectedMediaItem.likes} likes
                  </LightboxStat>
                  <LightboxStat>
                    <FontAwesomeIcon icon={faComment} />
                    {selectedMediaItem.comments} comments
                  </LightboxStat>
                </LightboxStats>
                <ActionButtons>
                  <ActionButton>
                    <FontAwesomeIcon icon={faShare} />
                    Share
                  </ActionButton>
                </ActionButtons>
              </LightboxActions>
            </LightboxInfo>
          </LightboxContent>
        </Lightbox>
      )}
    </Container>
  );
};

export default Gallery;