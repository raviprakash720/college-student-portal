import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faDownload, faFolder, faFilePdf, faFileWord, faFileExcel, faFile } from '@fortawesome/free-solid-svg-icons';

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

const UploadButton = styled.button`
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

const Filters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active?: boolean }>`
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
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
`;

const CardTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: var(--primary-color);
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FileItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const FileIcon = styled.span`
  margin-right: 1rem;
  color: var(--accent-color);
`;

const FileName = styled.span`
  flex: 1;
`;

const FileActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--accent-color);
  cursor: pointer;
  padding: 0.25rem;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const SemesterSection = styled.div`
  margin-bottom: 3rem;
`;

const SemesterTitle = styled.h2`
  color: var(--accent-color);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SubjectSection = styled.div`
  margin-bottom: 2rem;
`;

const SubjectTitle = styled.h3`
  color: var(--text-light);
  margin-bottom: 1rem;
`;

const UploadModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
  padding: 2rem;
  width: 90%;
  max-width: 500px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: var(--primary-color);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
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

const FileInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  border: 1px solid #ccc;
  background-color: var(--dark-bg);
  color: var(--text-light);
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: var(--text-light);
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  cursor: pointer;
  
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
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const CourseMaterials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    semester: '',
    subject: '',
    file: null as File | null,
    fileName: ''
  });

  // Mock data for course materials
  const semesters = [
    { id: 'sem1', name: 'Semester 1' },
    { id: 'sem2', name: 'Semester 2' },
    { id: 'sem3', name: 'Semester 3' },
    { id: 'sem4', name: 'Semester 4' },
  ];

  const subjects = [
    { id: 'math', name: 'Mathematics', semester: 'sem1' },
    { id: 'physics', name: 'Physics', semester: 'sem1' },
    { id: 'chemistry', name: 'Chemistry', semester: 'sem1' },
    { id: 'cs', name: 'Computer Science', semester: 'sem1' },
    { id: 'biology', name: 'Biology', semester: 'sem2' },
    { id: 'english', name: 'English Literature', semester: 'sem2' },
  ];

  const files = [
    { id: 1, name: 'Lecture Notes - Week 1.pdf', subject: 'math', type: 'pdf', size: '2.4 MB', date: '2025-09-15' },
    { id: 2, name: 'Problem Set 1.docx', subject: 'math', type: 'doc', size: '0.8 MB', date: '2025-09-16' },
    { id: 3, name: 'Physics Lab Manual.pdf', subject: 'physics', type: 'pdf', size: '5.2 MB', date: '2025-09-10' },
    { id: 4, name: 'Chemistry Equations.xlsx', subject: 'chemistry', type: 'xls', size: '1.1 MB', date: '2025-09-12' },
    { id: 5, name: 'Programming Basics.pptx', subject: 'cs', type: 'ppt', size: '3.7 MB', date: '2025-09-18' },
    { id: 6, name: 'Cell Biology Notes.pdf', subject: 'biology', type: 'pdf', size: '4.3 MB', date: '2025-09-20' },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return faFilePdf;
      case 'doc': return faFileWord;
      case 'xls': return faFileExcel;
      default: return faFile;
    }
  };

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadData({
        ...uploadData,
        file: file,
        fileName: file.name
      });
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock upload functionality
    console.log('Uploading file:', uploadData);
    setShowUploadModal(false);
    setUploadData({
      semester: '',
      subject: '',
      file: null,
      fileName: ''
    });
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = selectedSemester === 'all' || 
      subjects.find(s => s.id === file.subject)?.semester === selectedSemester;
    const matchesSubject = selectedSubject === 'all' || file.subject === selectedSubject;
    
    return matchesSearch && matchesSemester && matchesSubject;
  });

  return (
    <Container>
      <Header>
        <Title>Course Materials</Title>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
          <UploadButton onClick={() => setShowUploadModal(true)}>
            <FontAwesomeIcon icon={faUpload} />
            Upload
          </UploadButton>
        </SearchBar>
      </Header>

      <Filters>
        <FilterButton 
          active={selectedSemester === 'all'} 
          onClick={() => setSelectedSemester('all')}
        >
          All Semesters
        </FilterButton>
        {semesters.map(sem => (
          <FilterButton 
            key={sem.id}
            active={selectedSemester === sem.id} 
            onClick={() => setSelectedSemester(sem.id)}
          >
            {sem.name}
          </FilterButton>
        ))}
      </Filters>

      <Filters>
        <FilterButton 
          active={selectedSubject === 'all'} 
          onClick={() => setSelectedSubject('all')}
        >
          All Subjects
        </FilterButton>
        {subjects
          .filter(subject => selectedSemester === 'all' || subject.semester === selectedSemester)
          .map(subject => (
            <FilterButton 
              key={subject.id}
              active={selectedSubject === subject.id} 
              onClick={() => setSelectedSubject(subject.id)}
            >
              {subject.name}
            </FilterButton>
          ))
        }
      </Filters>

      <ContentGrid>
        {semesters
          .filter(sem => selectedSemester === 'all' || selectedSemester === sem.id)
          .map(sem => (
            <SemesterSection key={sem.id}>
              <SemesterTitle>{sem.name}</SemesterTitle>
              
              {subjects
                .filter(subject => subject.semester === sem.id && 
                  (selectedSubject === 'all' || selectedSubject === subject.id))
                .map(subject => (
                  <SubjectSection key={subject.id}>
                    <SubjectTitle>{subject.name}</SubjectTitle>
                    <Card>
                      <CardHeader>
                        <CardTitle>Documents</CardTitle>
                        <CardMeta>
                          <span>{filteredFiles.filter(f => f.subject === subject.id).length} files</span>
                        </CardMeta>
                      </CardHeader>
                      <CardBody>
                        <FileList>
                          {filteredFiles
                            .filter(file => file.subject === subject.id)
                            .map(file => (
                              <FileItem key={file.id}>
                                <FileIcon>
                                  <FontAwesomeIcon icon={getFileIcon(file.type)} />
                                </FileIcon>
                                <FileName>{file.name}</FileName>
                                <FileActions>
                                  <ActionButton title="Download">
                                    <FontAwesomeIcon icon={faDownload} />
                                  </ActionButton>
                                </FileActions>
                              </FileItem>
                            ))
                          }
                        </FileList>
                      </CardBody>
                    </Card>
                  </SubjectSection>
                ))
              }
            </SemesterSection>
          ))
        }
      </ContentGrid>

      {showUploadModal && (
        <UploadModal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Upload Material</ModalTitle>
              <CloseButton onClick={() => setShowUploadModal(false)}>×</CloseButton>
            </ModalHeader>
            
            <form onSubmit={handleUploadSubmit}>
              <ModalBody>
                <FormGroup>
                  <Label htmlFor="semester">Semester</Label>
                  <Select
                    id="semester"
                    value={uploadData.semester}
                    onChange={(e) => setUploadData({...uploadData, semester: e.target.value})}
                    required
                  >
                    <option value="">Select Semester</option>
                    {semesters.map(sem => (
                      <option key={sem.id} value={sem.id}>{sem.name}</option>
                    ))}
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    id="subject"
                    value={uploadData.subject}
                    onChange={(e) => setUploadData({...uploadData, subject: e.target.value})}
                    required
                    disabled={!uploadData.semester}
                  >
                    <option value="">Select Subject</option>
                    {subjects
                      .filter(subject => !uploadData.semester || subject.semester === uploadData.semester)
                      .map(subject => (
                        <option key={subject.id} value={subject.id}>{subject.name}</option>
                      ))
                    }
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="file">File</Label>
                  <FileInput
                    type="file"
                    id="file"
                    onChange={handleUploadChange}
                    required
                  />
                </FormGroup>
              </ModalBody>
              
              <ModalFooter>
                <CancelButton type="button" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </CancelButton>
                <SubmitButton type="submit">
                  Upload
                </SubmitButton>
              </ModalFooter>
            </form>
          </ModalContent>
        </UploadModal>
      )}
    </Container>
  );
};

export default CourseMaterials;