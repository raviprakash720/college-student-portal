import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faComment, faThumbsUp, faReply, faUser, faClock, faTag, faFire, faAward, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

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

const NewPostButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 0.75rem;
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

const StatsBar = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--primary-color);
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const ForumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const PostCard = styled.div`
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

const PostHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const PostTitle = styled.h3`
  margin: 0 0 0.75rem 0;
  color: var(--text-light);
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PostMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PostBody = styled.div`
  padding: 1.5rem;
`;

const PostExcerpt = styled.p`
  margin: 0 0 1.5rem 0;
  opacity: 0.9;
  line-height: 1.6;
`;

const TagList = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background-color: rgba(67, 97, 238, 0.2);
  color: var(--accent-color);
  padding: 0.35rem 0.75rem;
  border-radius: var(--border-radius);
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  font-weight: 500;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--accent-color);
  }
`;

const TrendingBadge = styled.span`
  background-color: var(--warning-color);
  color: var(--text-dark);
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
  font-size: 0.75rem;
  font-weight: bold;
`;

const PopularBadge = styled.span`
  background-color: var(--success-color);
  color: var(--text-dark);
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
  font-size: 0.75rem;
  font-weight: bold;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
  padding: 2rem;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ModalBody = styled.div`
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-light);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  border: 1px solid #ccc;
  background-color: var(--dark-bg);
  color: var(--text-light);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  border: 1px solid #ccc;
  background-color: var(--dark-bg);
  color: var(--text-light);
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: var(--text-light);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const SubmitButton = styled.button`
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

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  border: 1px solid #ccc;
  background-color: var(--dark-bg);
  color: var(--text-light);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const DiscussionForum: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general'
  });

  // Forum statistics
  const stats = {
    totalPosts: 1247,
    activeUsers: 382,
    totalReplies: 5893,
    trendingPosts: 24
  };

  // Mock data for forum posts
  const categories = [
    { id: 'all', name: 'All Categories', icon: faComment },
    { id: 'general', name: 'General Discussion', icon: faGraduationCap },
    { id: 'academics', name: 'Academics', icon: faGraduationCap },
    { id: 'assignments', name: 'Assignments', icon: faGraduationCap },
    { id: 'exams', name: 'Exams', icon: faGraduationCap },
    { id: 'campus', name: 'Campus Life', icon: faGraduationCap },
    { id: 'placements', name: 'Placements', icon: faAward },
    { id: 'events', name: 'Events', icon: faFire }
  ];

  const posts = [
    {
      id: 1,
      title: 'How to prepare for the midterm exams?',
      excerpt: 'I am struggling with time management for studying. Any tips from seniors? This is my first semester and I want to do well.',
      author: 'Alex Johnson',
      replies: 24,
      likes: 42,
      category: 'exams',
      tags: ['exams', 'study-tips', 'time-management'],
      timestamp: '2 hours ago',
      isTrending: true,
      isPopular: false
    },
    {
      id: 2,
      title: 'Recommended resources for Data Structures',
      excerpt: 'Looking for good online resources and textbooks for DS course. Prof. Smith recommended some but I want more options.',
      author: 'Sarah Miller',
      replies: 18,
      likes: 35,
      category: 'academics',
      tags: ['data-structures', 'resources', 'textbooks'],
      timestamp: '5 hours ago',
      isTrending: false,
      isPopular: true
    },
    {
      id: 3,
      title: 'Campus WiFi issues in the library',
      excerpt: 'The WiFi connection keeps dropping in the main library. Is anyone else facing this? IT department needs to look into this.',
      author: 'Mike Chen',
      replies: 15,
      likes: 27,
      category: 'campus',
      tags: ['wifi', 'library', 'technical-issue'],
      timestamp: '1 day ago',
      isTrending: false,
      isPopular: false
    },
    {
      id: 4,
      title: 'Group project partners needed',
      excerpt: 'Looking for 2 more members for the Software Engineering group project. We are working on a mobile app for campus navigation.',
      author: 'Emma Wilson',
      replies: 8,
      likes: 19,
      category: 'assignments',
      tags: ['group-project', 'software-engineering', 'mobile-app'],
      timestamp: '1 day ago',
      isTrending: false,
      isPopular: false
    },
    {
      id: 5,
      title: 'Silver Jubilee Celebration Volunteers Needed',
      excerpt: 'We need volunteers for the upcoming Silver Jubilee celebration. Various roles available including event coordination and hospitality.',
      author: 'Student Council',
      replies: 32,
      likes: 56,
      category: 'events',
      tags: ['silver-jubilee', 'volunteers', 'celebration'],
      timestamp: '2 days ago',
      isTrending: true,
      isPopular: true
    },
    {
      id: 6,
      title: 'Internship opportunities at Microsoft',
      excerpt: 'Microsoft is visiting our campus next week for internships. Here are the details of the roles and application process.',
      author: 'Career Services',
      replies: 47,
      likes: 89,
      category: 'placements',
      tags: ['internship', 'microsoft', 'placements'],
      timestamp: '3 days ago',
      isTrending: true,
      isPopular: true
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (sortBy === 'popular') {
      return b.likes - a.likes;
    } else if (sortBy === 'replies') {
      return b.replies - a.replies;
    }
    return 0;
  });

  const handleNewPostChange = (field: string, value: string) => {
    setNewPost({
      ...newPost,
      [field]: value
    });
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    console.log('New post:', newPost);
    setShowNewPostModal(false);
    setNewPost({
      title: '',
      content: '',
      category: 'general'
    });
  };

  return (
    <Container>
      <Header>
        <Title>
          <FontAwesomeIcon icon={faComment} /> Student Discussion Forum
        </Title>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search discussions, authors, tags..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
          <NewPostButton onClick={() => setShowNewPostModal(true)}>
            <FontAwesomeIcon icon={faPlus} /> New Post
          </NewPostButton>
        </SearchBar>
      </Header>

      <StatsBar>
        <StatItem>
          <StatValue>{stats.totalPosts}</StatValue>
          <StatLabel>Total Posts</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{stats.activeUsers}</StatValue>
          <StatLabel>Active Users</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{stats.totalReplies}</StatValue>
          <StatLabel>Total Replies</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{stats.trendingPosts}</StatValue>
          <StatLabel>Trending Now</StatLabel>
        </StatItem>
      </StatsBar>

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
          <option value="latest">Sort by Latest</option>
          <option value="popular">Sort by Popularity</option>
          <option value="replies">Sort by Replies</option>
        </SortSelect>
      </Controls>

      <ForumGrid>
        {filteredPosts.map(post => (
          <PostCard key={post.id}>
            <PostHeader>
              <PostTitle>
                {post.title}
                {post.isTrending && <TrendingBadge>Hot</TrendingBadge>}
                {post.isPopular && <PopularBadge>Popular</PopularBadge>}
              </PostTitle>
              <PostMeta>
                <MetaItem>
                  <FontAwesomeIcon icon={faUser} /> {post.author}
                </MetaItem>
                <MetaItem>
                  <FontAwesomeIcon icon={faClock} /> {post.timestamp}
                </MetaItem>
              </PostMeta>
            </PostHeader>
            <PostBody>
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              <TagList>
                {post.tags.map((tag, index) => (
                  <Tag key={index}>
                    <FontAwesomeIcon icon={faTag} /> {tag}
                  </Tag>
                ))}
              </TagList>
              <PostActions>
                <ActionButton>
                  <FontAwesomeIcon icon={faThumbsUp} /> {post.likes}
                </ActionButton>
                <ActionButton>
                  <FontAwesomeIcon icon={faReply} /> {post.replies} replies
                </ActionButton>
              </PostActions>
            </PostBody>
          </PostCard>
        ))}
      </ForumGrid>

      {showNewPostModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                <FontAwesomeIcon icon={faPlus} /> Create New Discussion
              </ModalTitle>
              <CloseButton onClick={() => setShowNewPostModal(false)}>×</CloseButton>
            </ModalHeader>
            
            <form onSubmit={handleSubmitPost}>
              <ModalBody>
                <FormGroup>
                  <Label htmlFor="title">Discussion Title</Label>
                  <Input
                    type="text"
                    id="title"
                    value={newPost.title}
                    onChange={(e) => handleNewPostChange('title', e.target.value)}
                    placeholder="Enter a clear and descriptive title"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    id="category"
                    value={newPost.category}
                    onChange={(e) => handleNewPostChange('category', e.target.value)}
                  >
                    {categories.filter(cat => cat.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="content">Discussion Content</Label>
                  <TextArea
                    id="content"
                    value={newPost.content}
                    onChange={(e) => handleNewPostChange('content', e.target.value)}
                    placeholder="Describe your question, idea, or topic in detail. Be clear and respectful."
                    required
                  />
                </FormGroup>
              </ModalBody>
              
              <ModalFooter>
                <CancelButton type="button" onClick={() => setShowNewPostModal(false)}>
                  Cancel
                </CancelButton>
                <SubmitButton type="submit">
                  Post Discussion
                </SubmitButton>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default DiscussionForum;