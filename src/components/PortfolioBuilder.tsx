import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGraduationCap, faBriefcase, faCode, faFileAlt, faSave, faUpload, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 2rem 0;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const PortfolioCard = styled.div`
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: var(--accent-color);
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
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
  padding: 0.75rem;
  border-radius: var(--border-radius);
  border: 1px solid #ccc;
  background-color: var(--dark-bg);
  color: var(--text-light);
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Item = styled.div`
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  position: relative;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ItemTitle = styled.h3`
  margin: 0;
  color: var(--accent-color);
`;

const RemoveButton = styled.button`
  padding: 0.25rem;
  background: none;
  border: none;
  color: var(--error-color);
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: var(--accent-color);
  border: 1px solid var(--accent-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(76, 201, 240, 0.1);
  }
`;

const ProfilePreview = styled.div`
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  text-align: center;
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: var(--accent-color);
`;

const ProfileName = styled.h2`
  color: var(--primary-color);
  margin: 0 0 0.5rem 0;
`;

const ProfileTitle = styled.h3`
  color: var(--accent-color);
  margin: 0 0 1rem 0;
  font-weight: normal;
`;

const ProfileDetails = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const DetailItem = styled.div`
  text-align: center;
`;

const DetailValue = styled.div`
  font-weight: bold;
  color: var(--primary-color);
`;

const DetailLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const PortfolioBuilder: React.FC = () => {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    about: ''
  });

  const [education, setEducation] = useState<any[]>([
    { id: 1, degree: '', institution: '', year: '' }
  ]);

  const [experience, setExperience] = useState<any[]>([
    { id: 1, position: '', company: '', duration: '', description: '' }
  ]);

  const [skills, setSkills] = useState<any[]>([
    { id: 1, name: '', level: 'Intermediate' }
  ]);

  const [projects, setProjects] = useState<any[]>([
    { id: 1, name: '', description: '', link: '' }
  ]);

  const handleProfileChange = (field: string, value: string) => {
    setProfile({
      ...profile,
      [field]: value
    });
  };

  const handleEducationChange = (id: number, field: string, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { id: Date.now(), degree: '', institution: '', year: '' }
    ]);
  };

  const removeEducation = (id: number) => {
    if (education.length > 1) {
      setEducation(education.filter(edu => edu.id !== id));
    }
  };

  const handleExperienceChange = (id: number, field: string, value: string) => {
    setExperience(experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      { id: Date.now(), position: '', company: '', duration: '', description: '' }
    ]);
  };

  const removeExperience = (id: number) => {
    if (experience.length > 1) {
      setExperience(experience.filter(exp => exp.id !== id));
    }
  };

  const handleSkillsChange = (id: number, field: string, value: string) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const addSkill = () => {
    setSkills([
      ...skills,
      { id: Date.now(), name: '', level: 'Intermediate' }
    ]);
  };

  const removeSkill = (id: number) => {
    if (skills.length > 1) {
      setSkills(skills.filter(skill => skill.id !== id));
    }
  };

  const handleProjectsChange = (id: number, field: string, value: string) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { id: Date.now(), name: '', description: '', link: '' }
    ]);
  };

  const removeProject = (id: number) => {
    if (projects.length > 1) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  const savePortfolio = () => {
    // Mock save functionality
    alert('Portfolio saved successfully!');
  };

  return (
    <Container>
      <Header>
        <Title>
          <FontAwesomeIcon icon={faUser} /> Portfolio Builder
        </Title>
      </Header>

      <PortfolioCard>
        <SectionTitle>
          <FontAwesomeIcon icon={faUser} /> Personal Information
        </SectionTitle>
        
        <Form>
          <FormGroup>
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              value={profile.name}
              onChange={(e) => handleProfileChange('name', e.target.value)}
              placeholder="Enter your full name"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="title">Professional Title</Label>
            <Input
              type="text"
              id="title"
              value={profile.title}
              onChange={(e) => handleProfileChange('title', e.target.value)}
              placeholder="e.g., Computer Science Student"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={profile.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
              placeholder="Enter your email"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              id="phone"
              value={profile.phone}
              onChange={(e) => handleProfileChange('phone', e.target.value)}
              placeholder="Enter your phone number"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="location">Location</Label>
            <Input
              type="text"
              id="location"
              value={profile.location}
              onChange={(e) => handleProfileChange('location', e.target.value)}
              placeholder="Enter your location"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="about">About Me</Label>
            <TextArea
              id="about"
              value={profile.about}
              onChange={(e) => handleProfileChange('about', e.target.value)}
              placeholder="Tell us about yourself..."
            />
          </FormGroup>
        </Form>
      </PortfolioCard>

      <PortfolioCard>
        <SectionTitle>
          <FontAwesomeIcon icon={faGraduationCap} /> Education
        </SectionTitle>
        
        <ItemList>
          {education.map(edu => (
            <Item key={edu.id}>
              <ItemHeader>
                <ItemTitle>Education Item</ItemTitle>
                <RemoveButton onClick={() => removeEducation(edu.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </RemoveButton>
              </ItemHeader>
              
              <FormGroup>
                <Label>Degree</Label>
                <Input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                  placeholder="e.g., Bachelor of Science in Computer Science"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Institution</Label>
                <Input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                  placeholder="Enter institution name"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Year</Label>
                <Input
                  type="text"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(edu.id, 'year', e.target.value)}
                  placeholder="e.g., 2022-2025"
                />
              </FormGroup>
            </Item>
          ))}
        </ItemList>
        
        <AddButton onClick={addEducation}>
          <FontAwesomeIcon icon={faPlus} /> Add Education
        </AddButton>
      </PortfolioCard>

      <PortfolioCard>
        <SectionTitle>
          <FontAwesomeIcon icon={faBriefcase} /> Experience
        </SectionTitle>
        
        <ItemList>
          {experience.map(exp => (
            <Item key={exp.id}>
              <ItemHeader>
                <ItemTitle>Experience Item</ItemTitle>
                <RemoveButton onClick={() => removeExperience(exp.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </RemoveButton>
              </ItemHeader>
              
              <FormGroup>
                <Label>Position</Label>
                <Input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)}
                  placeholder="e.g., Software Intern"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Company</Label>
                <Input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                  placeholder="Enter company name"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Duration</Label>
                <Input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => handleExperienceChange(exp.id, 'duration', e.target.value)}
                  placeholder="e.g., June 2024 - August 2024"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                  placeholder="Describe your responsibilities and achievements"
                />
              </FormGroup>
            </Item>
          ))}
        </ItemList>
        
        <AddButton onClick={addExperience}>
          <FontAwesomeIcon icon={faPlus} /> Add Experience
        </AddButton>
      </PortfolioCard>

      <PortfolioCard>
        <SectionTitle>
          <FontAwesomeIcon icon={faCode} /> Skills
        </SectionTitle>
        
        <ItemList>
          {skills.map(skill => (
            <Item key={skill.id}>
              <ItemHeader>
                <ItemTitle>Skill Item</ItemTitle>
                <RemoveButton onClick={() => removeSkill(skill.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </RemoveButton>
              </ItemHeader>
              
              <FormGroup>
                <Label>Skill Name</Label>
                <Input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleSkillsChange(skill.id, 'name', e.target.value)}
                  placeholder="e.g., JavaScript, React, Python"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Level</Label>
                <Select
                  value={skill.level}
                  onChange={(e) => handleSkillsChange(skill.id, 'level', e.target.value)}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </Select>
              </FormGroup>
            </Item>
          ))}
        </ItemList>
        
        <AddButton onClick={addSkill}>
          <FontAwesomeIcon icon={faPlus} /> Add Skill
        </AddButton>
      </PortfolioCard>

      <PortfolioCard>
        <SectionTitle>
          <FontAwesomeIcon icon={faFileAlt} /> Projects
        </SectionTitle>
        
        <ItemList>
          {projects.map(project => (
            <Item key={project.id}>
              <ItemHeader>
                <ItemTitle>Project Item</ItemTitle>
                <RemoveButton onClick={() => removeProject(project.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </RemoveButton>
              </ItemHeader>
              
              <FormGroup>
                <Label>Project Name</Label>
                <Input
                  type="text"
                  value={project.name}
                  onChange={(e) => handleProjectsChange(project.id, 'name', e.target.value)}
                  placeholder="Enter project name"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={project.description}
                  onChange={(e) => handleProjectsChange(project.id, 'description', e.target.value)}
                  placeholder="Describe your project"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Link</Label>
                <Input
                  type="url"
                  value={project.link}
                  onChange={(e) => handleProjectsChange(project.id, 'link', e.target.value)}
                  placeholder="Enter project URL (optional)"
                />
              </FormGroup>
            </Item>
          ))}
        </ItemList>
        
        <AddButton onClick={addProject}>
          <FontAwesomeIcon icon={faPlus} /> Add Project
        </AddButton>
      </PortfolioCard>

      <Button onClick={savePortfolio}>
        <FontAwesomeIcon icon={faSave} /> Save Portfolio
      </Button>

      {/* Preview Section */}
      <ProfilePreview>
        <SectionTitle>
          <FontAwesomeIcon icon={faUser} /> Portfolio Preview
        </SectionTitle>
        
        <ProfileImage>
          <FontAwesomeIcon icon={faUser} />
        </ProfileImage>
        
        <ProfileName>{profile.name || 'Your Name'}</ProfileName>
        <ProfileTitle>{profile.title || 'Professional Title'}</ProfileTitle>
        
        <ProfileDetails>
          <DetailItem>
            <DetailValue>{profile.email || 'email@example.com'}</DetailValue>
            <DetailLabel>Email</DetailLabel>
          </DetailItem>
          <DetailItem>
            <DetailValue>{profile.phone || '+1 (123) 456-7890'}</DetailValue>
            <DetailLabel>Phone</DetailLabel>
          </DetailItem>
          <DetailItem>
            <DetailValue>{profile.location || 'City, Country'}</DetailValue>
            <DetailLabel>Location</DetailLabel>
          </DetailItem>
        </ProfileDetails>
        
        <p>{profile.about || 'Your bio will appear here...'}</p>
      </ProfilePreview>
    </Container>
  );
};

// We need to define the Select component that was used but not defined
const Select = styled.select`
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

export default PortfolioBuilder;