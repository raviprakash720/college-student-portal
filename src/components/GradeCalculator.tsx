import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faPlus, faTrash, faChartBar } from '@fortawesome/free-solid-svg-icons';

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
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
`;

const CalculatorCard = styled.div`
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

const CoursesContainer = styled.div`
  margin: 2rem 0;
`;

const CourseItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const CourseInput = styled.input`
  flex: 2;
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

const GradeInput = styled.input`
  flex: 1;
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

const CreditInput = styled.input`
  flex: 1;
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

const RemoveButton = styled.button`
  padding: 0.75rem;
  background-color: rgba(244, 67, 54, 0.2);
  color: var(--error-color);
  border: 1px solid var(--error-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: rgba(244, 67, 54, 0.3);
  }
`;

const ResultsContainer = styled.div`
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  text-align: center;
`;

const ResultTitle = styled.h2`
  color: var(--accent-color);
  margin-top: 0;
`;

const GpaDisplay = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: var(--primary-color);
  margin: 1rem 0;
`;

const LetterGrade = styled.div`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button<{ active?: boolean }>`
  padding: 0.75rem 1.5rem;
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

const GradeCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gpa' | 'cgpa'>('gpa');
  const [courses, setCourses] = useState([
    { id: 1, name: '', grade: '', credits: '' },
    { id: 2, name: '', grade: '', credits: '' },
  ]);
  const [gpa, setGpa] = useState<number | null>(null);
  const [letterGrade, setLetterGrade] = useState<string>('');

  // Grade point mapping
  const gradePoints: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now(), name: '', grade: '', credits: '' }
    ]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id: number, field: 'name' | 'grade' | 'credits', value: string) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    
    for (const course of courses) {
      if (course.grade && course.credits) {
        const gradePoint = gradePoints[course.grade.toUpperCase()] || 0;
        const credits = parseFloat(course.credits) || 0;
        
        totalPoints += gradePoint * credits;
        totalCredits += credits;
      }
    }
    
    if (totalCredits > 0) {
      const calculatedGpa = totalPoints / totalCredits;
      setGpa(parseFloat(calculatedGpa.toFixed(2)));
      
      // Determine letter grade
      if (calculatedGpa >= 3.7) setLetterGrade('A');
      else if (calculatedGpa >= 3.3) setLetterGrade('B+');
      else if (calculatedGpa >= 3.0) setLetterGrade('B');
      else if (calculatedGpa >= 2.7) setLetterGrade('C+');
      else if (calculatedGpa >= 2.0) setLetterGrade('C');
      else if (calculatedGpa >= 1.0) setLetterGrade('D');
      else setLetterGrade('F');
    } else {
      setGpa(null);
      setLetterGrade('');
    }
  };

  const resetCalculator = () => {
    setCourses([
      { id: 1, name: '', grade: '', credits: '' },
      { id: 2, name: '', grade: '', credits: '' },
    ]);
    setGpa(null);
    setLetterGrade('');
  };

  return (
    <Container>
      <Header>
        <Title>
          <FontAwesomeIcon icon={faCalculator} /> Grade Calculator
        </Title>
        <Subtitle>
          Calculate your GPA and CGPA based on your course grades and credit hours
        </Subtitle>
      </Header>

      <Tabs>
        <TabButton 
          active={activeTab === 'gpa'} 
          onClick={() => setActiveTab('gpa')}
        >
          GPA Calculator
        </TabButton>
        <TabButton 
          active={activeTab === 'cgpa'} 
          onClick={() => setActiveTab('cgpa')}
        >
          CGPA Calculator
        </TabButton>
      </Tabs>

      <CalculatorCard>
        <SectionTitle>Enter Your Courses</SectionTitle>
        
        <CoursesContainer>
          {courses.map((course) => (
            <CourseItem key={course.id}>
              <CourseInput
                type="text"
                placeholder="Course name"
                value={course.name}
                onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
              />
              <Select
                value={course.grade}
                onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
              >
                <option value="">Select Grade</option>
                <option value="A+">A+ (4.0)</option>
                <option value="A">A (4.0)</option>
                <option value="A-">A- (3.7)</option>
                <option value="B+">B+ (3.3)</option>
                <option value="B">B (3.0)</option>
                <option value="B-">B- (2.7)</option>
                <option value="C+">C+ (2.3)</option>
                <option value="C">C (2.0)</option>
                <option value="C-">C- (1.7)</option>
                <option value="D+">D+ (1.3)</option>
                <option value="D">D (1.0)</option>
                <option value="F">F (0.0)</option>
              </Select>
              <CreditInput
                type="number"
                placeholder="Credits"
                value={course.credits}
                onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                min="1"
              />
              <RemoveButton onClick={() => removeCourse(course.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </RemoveButton>
            </CourseItem>
          ))}
        </CoursesContainer>
        
        <Button type="button" onClick={addCourse}>
          <FontAwesomeIcon icon={faPlus} /> Add Course
        </Button>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <Button type="button" onClick={calculateGPA}>
            <FontAwesomeIcon icon={faCalculator} /> Calculate GPA
          </Button>
          <Button type="button" onClick={resetCalculator} style={{ backgroundColor: 'transparent', border: '1px solid #ccc', color: 'var(--text-light)' }}>
            Reset
          </Button>
        </div>
      </CalculatorCard>

      {gpa !== null && (
        <ResultsContainer>
          <ResultTitle>Your Results</ResultTitle>
          <GpaDisplay>{gpa.toFixed(2)}</GpaDisplay>
          <LetterGrade>Letter Grade: {letterGrade}</LetterGrade>
          <p>
            Based on {courses.filter(c => c.grade && c.credits).length} courses
          </p>
        </ResultsContainer>
      )}
    </Container>
  );
};

export default GradeCalculator;