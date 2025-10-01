import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLink, faBookmark, faBook, faFlask, faGraduationCap, faNewspaper } from '@fortawesome/free-solid-svg-icons';

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

const SearchButton = styled.button`
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

const Categories = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--text-light)'};
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: ${props => props.active ? 'var(--secondary-color)' : 'rgba(67, 97, 238, 0.1)'};
  }
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ResourceCard = styled.div`
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CategoryIcon = styled.div`
  font-size: 1.5rem;
  color: var(--accent-color);
`;

const CardTitle = styled.h3`
  margin: 0;
  color: var(--primary-color);
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const ResourceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ResourceItem = styled.li`
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ResourceLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: var(--text-light);
  transition: var(--transition);
  
  &:hover {
    color: var(--accent-color);
  }
`;

const LinkIcon = styled.span`
  color: var(--accent-color);
`;

const LinkText = styled.span`
  flex: 1;
`;

const BookmarkButton = styled.button`
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.25rem;
  
  &:hover {
    color: var(--warning-color);
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  grid-column: 1 / -1;
`;

const ResearchResources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for research resources
  const categories = [
    { id: 'all', name: 'All Resources', icon: faBook },
    { id: 'journals', name: 'Academic Journals', icon: faNewspaper },
    { id: 'databases', name: 'Research Databases', icon: faFlask },
    { id: 'theses', name: 'Theses & Dissertations', icon: faGraduationCap },
    { id: 'books', name: 'E-Books', icon: faBook },
  ];

  const resources = [
    {
      id: 1,
      title: 'IEEE Xplore Digital Library',
      url: 'https://ieeexplore.ieee.org',
      category: 'journals',
      description: 'Full-text access to IEEE journals, transactions, magazines, and conference proceedings'
    },
    {
      id: 2,
      title: 'ACM Digital Library',
      url: 'https://dl.acm.org',
      category: 'journals',
      description: 'Full-text collection of ACM publications and bibliographic databases'
    },
    {
      id: 3,
      title: 'ScienceDirect',
      url: 'https://www.sciencedirect.com',
      category: 'databases',
      description: 'Leading full-text scientific database offering journal articles and book chapters'
    },
    {
      id: 4,
      title: 'JSTOR',
      url: 'https://www.jstor.org',
      category: 'journals',
      description: 'Digital library of academic journals, books, and primary sources'
    },
    {
      id: 5,
      title: 'Google Scholar',
      url: 'https://scholar.google.com',
      category: 'databases',
      description: 'Freely accessible web search engine that indexes scholarly literature'
    },
    {
      id: 6,
      title: 'ProQuest Dissertations',
      url: 'https://about.proquest.com/en/products-services/pqdt-global',
      category: 'theses',
      description: 'Comprehensive collection of dissertations and theses from around the world'
    },
    {
      id: 7,
      title: 'SpringerLink',
      url: 'https://link.springer.com',
      category: 'journals',
      description: 'Access to millions of scientific documents from journals, books, series, protocols and reference works'
    },
    {
      id: 8,
      title: 'Project MUSE',
      url: 'https://muse.jhu.edu',
      category: 'journals',
      description: 'Trusted source for complete, full-text versions of scholarly journals'
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : faLink;
  };

  const groupedResources = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, typeof resources>);

  return (
    <Container>
      <Header>
        <Title>Research Resources</Title>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search research resources..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
          <SearchButton>
            <FontAwesomeIcon icon={faSearch} />
            Search
          </SearchButton>
        </SearchBar>
      </Header>

      <Categories>
        {categories.map(category => (
          <CategoryButton
            key={category.id}
            active={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            <FontAwesomeIcon icon={category.icon} /> {category.name}
          </CategoryButton>
        ))}
      </Categories>

      <ResourcesGrid>
        {Object.keys(groupedResources).length > 0 ? (
          Object.entries(groupedResources).map(([categoryId, categoryResources]) => {
            const category = categories.find(cat => cat.id === categoryId) || categories[0];
            
            return (
              <ResourceCard key={categoryId}>
                <CardHeader>
                  <CategoryIcon>
                    <FontAwesomeIcon icon={category.icon} />
                  </CategoryIcon>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardBody>
                  <ResourceList>
                    {categoryResources.map(resource => (
                      <ResourceItem key={resource.id}>
                        <ResourceLink href={resource.url} target="_blank" rel="noopener noreferrer">
                          <LinkIcon>
                            <FontAwesomeIcon icon={faLink} />
                          </LinkIcon>
                          <LinkText>{resource.title}</LinkText>
                          <BookmarkButton title="Bookmark">
                            <FontAwesomeIcon icon={faBookmark} />
                          </BookmarkButton>
                        </ResourceLink>
                      </ResourceItem>
                    ))}
                  </ResourceList>
                </CardBody>
              </ResourceCard>
            );
          })
        ) : (
          <NoResults>
            <h3>No resources found</h3>
            <p>Try adjusting your search or category filter</p>
          </NoResults>
        )}
      </ResourcesGrid>
    </Container>
  );
};

export default ResearchResources;