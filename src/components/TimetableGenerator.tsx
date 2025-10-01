import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faPlus, faTrash, faDownload, faSave } from '@fortawesome/free-solid-svg-icons';

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

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
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

const TimetableContainer = styled.div`
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  overflow-x: auto;
`;

const TimetableGrid = styled.div`
  display: grid;
  grid-template-columns: 100px repeat(5, 1fr);
  gap: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  min-width: 800px;
`;

const TimetableHeader = styled.div`
  background-color: var(--primary-color);
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
`;

const TimetableTimeSlot = styled.div`
  background-color: var(--dark-bg);
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimetableCell = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  min-height: 100px;
  position: relative;
`;

const CourseForm = styled.div`
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  margin-top: 2rem;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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

const CourseList = styled.div`
  margin-top: 2rem;
`;

const CourseItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
`;

const CourseInfo = styled.div`
  flex: 1;
`;

const CourseName = styled.div`
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const CourseDetails = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const RemoveButton = styled.button`
  padding: 0.5rem;
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

const TimetableGenerator: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    day: 'monday',
    startTime: '09:00',
    endTime: '10:00',
    location: ''
  });

  // Days and time slots for the timetable
  const days = [
    { id: 'monday', name: 'Monday' },
    { id: 'tuesday', name: 'Tuesday' },
    { id: 'wednesday', name: 'Wednesday' },
    { id: 'thursday', name: 'Thursday' },
    { id: 'friday', name: 'Friday' }
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const addCourse = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newCourse.name && newCourse.code) {
      setCourses([
        ...courses,
        {
          id: Date.now(),
          ...newCourse
        }
      ]);
      
      setNewCourse({
        name: '',
        code: '',
        day: 'monday',
        startTime: '09:00',
        endTime: '10:00',
        location: ''
      });
    }
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleInputChange = (field: string, value: string) => {
    setNewCourse({
      ...newCourse,
      [field]: value
    });
  };

  const exportTimetable = () => {
    // Mock export functionality
    alert('Timetable exported as PDF!');
  };

  const saveTimetable = () => {
    // Mock save functionality
    alert('Timetable saved successfully!');
  };

  // Function to get courses for a specific time slot and day
  const getCoursesForSlot = (day: string, time: string) => {
    return courses.filter(course => 
      course.day === day && 
      course.startTime <= time && 
      course.endTime > time
    );
  };

  return (
    <Container>
      <Header>
        <Title>
          <FontAwesomeIcon icon={faTable} /> Timetable Generator
        </Title>
        <Actions>
          <ActionButton onClick={saveTimetable}>
            <FontAwesomeIcon icon={faSave} /> Save
          </ActionButton>
          <ActionButton onClick={exportTimetable}>
            <FontAwesomeIcon icon={faDownload} /> Export PDF
          </ActionButton>
        </Actions>
      </Header>

      <TimetableContainer>
        <TimetableGrid>
          <TimetableHeader>Time</TimetableHeader>
          {days.map(day => (
            <TimetableHeader key={day.id}>{day.name}</TimetableHeader>
          ))}
          
          {timeSlots.map(time => (
            <React.Fragment key={time}>
              <TimetableTimeSlot>{time}</TimetableTimeSlot>
              {days.map(day => (
                <TimetableCell key={`${day.id}-${time}`}>
                  {getCoursesForSlot(day.id, time).map(course => (
                    <div key={course.id} style={{ marginBottom: '0.5rem' }}>
                      <div style={{ fontWeight: 'bold' }}>{course.code}</div>
                      <div style={{ fontSize: '0.9rem' }}>{course.name}</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{course.location}</div>
                    </div>
                  ))}
                </TimetableCell>
              ))}
            </React.Fragment>
          ))}
        </TimetableGrid>
      </TimetableContainer>

      <CourseForm>
        <SectionTitle>
          <FontAwesomeIcon icon={faPlus} /> Add Course
        </SectionTitle>
        
        <Form onSubmit={addCourse}>
          <FormGroup>
            <Label htmlFor="name">Course Name</Label>
            <Input
              type="text"
              id="name"
              value={newCourse.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter course name"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="code">Course Code</Label>
            <Input
              type="text"
              id="code"
              value={newCourse.code}
              onChange={(e) => handleInputChange('code', e.target.value)}
              placeholder="Enter course code"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="day">Day</Label>
            <Select
              id="day"
              value={newCourse.day}
              onChange={(e) => handleInputChange('day', e.target.value)}
            >
              {days.map(day => (
                <option key={day.id} value={day.id}>{day.name}</option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              type="time"
              id="startTime"
              value={newCourse.startTime}
              onChange={(e) => handleInputChange('startTime', e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="endTime">End Time</Label>
            <Input
              type="time"
              id="endTime"
              value={newCourse.endTime}
              onChange={(e) => handleInputChange('endTime', e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="location">Location</Label>
            <Input
              type="text"
              id="location"
              value={newCourse.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter classroom/venue"
            />
          </FormGroup>
          
          <div style={{ gridColumn: '1 / -1' }}>
            <Button type="submit">
              <FontAwesomeIcon icon={faPlus} /> Add Course
            </Button>
          </div>
        </Form>
      </CourseForm>

      {courses.length > 0 && (
        <CourseList>
          <SectionTitle>
            <FontAwesomeIcon icon={faTable} /> Your Courses
          </SectionTitle>
          
          {courses.map(course => (
            <CourseItem key={course.id}>
              <CourseInfo>
                <CourseName>{course.name} ({course.code})</CourseName>
                <CourseDetails>
                  <span>{course.day.charAt(0).toUpperCase() + course.day.slice(1)} {course.startTime}-{course.endTime}</span>
                  <span>{course.location}</span>
                </CourseDetails>
              </CourseInfo>
              <RemoveButton onClick={() => removeCourse(course.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </RemoveButton>
            </CourseItem>
          ))}
        </CourseList>
      )}
    </Container>
  );
};

export default TimetableGenerator;