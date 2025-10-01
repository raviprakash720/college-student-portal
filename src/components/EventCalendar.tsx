import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronLeft, faChevronRight, faMapMarkerAlt, faClock, faUsers, faPlus, faGraduationCap, faLaptopCode, faMusic, faFootballBall, faBook, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, isSameMonth, isSameDay, addDays } from 'date-fns';

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

const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavButton = styled.button`
  background-color: var(--dark-card);
  color: var(--text-light);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  font-weight: 500;
  
  &:hover {
    background-color: rgba(67, 97, 238, 0.2);
  }
`;

const MonthYear = styled.h2`
  margin: 0 1rem;
  min-width: 250px;
  text-align: center;
  color: var(--text-light);
`;

const ViewToggle = styled.div`
  display: flex;
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ViewButton = styled.button<{ active?: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--text-light)'};
  border: none;
  cursor: pointer;
  transition: var(--transition);
  font-weight: 500;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--secondary-color)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  overflow: hidden;
`;

const CalendarHeader = styled.div`
  background-color: var(--dark-card);
  text-align: center;
  padding: 1rem 0;
  font-weight: bold;
  color: var(--text-light);
`;

const CalendarDay = styled.div`
  background-color: var(--dark-card);
  min-height: 150px;
  padding: 0.5rem;
  position: relative;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const DayNumber = styled.div<{ isCurrentMonth?: boolean; isToday?: boolean }>`
  text-align: right;
  padding: 0.25rem;
  color: ${props => 
    props.isToday ? 'var(--primary-color)' : 
    props.isCurrentMonth ? 'var(--text-light)' : 'rgba(255, 255, 255, 0.3)'
  };
  font-weight: ${props => props.isToday ? 'bold' : 'normal'};
  font-size: 1.1rem;
`;

const EventsContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const EventItem = styled.div<{ color?: string }>`
  background-color: ${props => `var(--${props.color || 'primary'}-color)`};
  color: white;
  border-radius: var(--border-radius);
  padding: 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: var(--transition);
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const EventModal = styled.div`
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
  max-width: 600px;
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

const EventDetail = styled.div`
  margin-bottom: 1.25rem;
`;

const DetailLabel = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DetailValue = styled.div`
  opacity: 0.9;
  color: var(--text-light);
  line-height: 1.5;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  font-weight: 500;
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const SecondaryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: var(--text-light);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  font-weight: 500;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const NewEventButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: var(--transition);
  font-weight: 500;
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const EventIcon = styled.span`
  margin-right: 0.5rem;
`;

const EventCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [view, setView] = useState<'month' | 'week'>('month');

  // Enhanced mock data for college events
  const events = [
    {
      id: 1,
      title: 'Silver Jubilee Celebration',
      date: new Date(2025, 9, 20),
      time: '9:00 AM - 5:00 PM',
      location: 'Main Auditorium & Campus Grounds',
      attendees: 1500,
      color: 'accent',
      type: 'annual-day',
      description: 'Grand celebration marking 25 years of excellence in education with performances, exhibitions, and alumni meet.',
      icon: faGraduationCap
    },
    {
      id: 2,
      title: 'Udbhav 2025 - Cultural Fest',
      date: new Date(2025, 9, 25),
      time: '10:00 AM - 8:00 PM',
      location: 'Entire Campus',
      attendees: 3000,
      color: 'primary',
      type: 'cultural',
      description: 'Annual cultural festival featuring dance, music, drama, fashion show, and food stalls.',
      icon: faMusic
    },
    {
      id: 3,
      title: 'INNOQUEST 2025 Hackathon',
      date: new Date(2025, 9, 28),
      time: '9:00 AM - 6:00 PM',
      location: 'Computer Science Block',
      attendees: 150,
      color: 'success',
      type: 'tech',
      description: '24-hour hackathon with problem statements from industry partners and cash prizes for winners.',
      icon: faLaptopCode
    },
    {
      id: 4,
      title: 'Inter-College Basketball Championship Finals',
      date: new Date(2025, 9, 30),
      time: '4:00 PM - 6:00 PM',
      location: 'Main Sports Ground',
      attendees: 800,
      color: 'warning',
      type: 'sports',
      description: 'Exciting finals of the annual basketball tournament with VJIT vs VNR.',
      icon: faFootballBall
    },
    {
      id: 5,
      title: 'AI in Healthcare Guest Lecture',
      date: new Date(2025, 9, 31),
      time: '3:00 PM - 5:00 PM',
      location: 'Room 205, Academic Block',
      attendees: 120,
      color: 'primary',
      type: 'workshop',
      description: 'Distinguished speaker from Microsoft discussing applications of AI in modern healthcare systems.',
      icon: faChalkboardTeacher
    },
    {
      id: 6,
      title: 'Midterm Examinations Begin',
      date: new Date(2025, 10, 5),
      time: '9:00 AM - 12:00 PM',
      location: 'Examination Halls',
      attendees: 2500,
      color: 'error',
      type: 'academic',
      description: 'Midterm examinations for all departments. Students must carry ID cards.',
      icon: faBook
    },
    {
      id: 7,
      title: 'Career Fair 2025',
      date: new Date(2025, 10, 10),
      time: '10:00 AM - 4:00 PM',
      location: 'Student Center & Grounds',
      attendees: 2000,
      color: 'accent',
      type: 'annual-day',
      description: 'Major recruitment event with 30+ companies visiting campus for internships and full-time positions.',
      icon: faGraduationCap
    },
    {
      id: 8,
      title: 'Alumni Meet 2025',
      date: new Date(2025, 10, 15),
      time: '11:00 AM - 5:00 PM',
      location: 'Main Auditorium',
      attendees: 500,
      color: 'primary',
      type: 'alumni',
      description: 'Annual alumni meet with networking sessions, panel discussions, and cultural programs.',
      icon: faUsers
    },
    {
      id: 9,
      title: 'NSS Community Service Camp',
      date: new Date(2025, 10, 20),
      time: '8:00 AM - 5:00 PM',
      location: 'Rural Areas (Transport Provided)',
      attendees: 100,
      color: 'success',
      type: 'annual-day',
      description: 'Two-week community service camp organized by NSS volunteers for educational and health awareness.',
      icon: faUsers
    },
    {
      id: 10,
      title: 'Department Tech Talks',
      date: new Date(2025, 10, 25),
      time: '2:00 PM - 6:00 PM',
      location: 'Department Seminar Halls',
      attendees: 300,
      color: 'primary',
      type: 'tech',
      description: 'Series of technical talks by industry experts showcasing student projects and innovations.',
      icon: faLaptopCode
    }
  ];

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const renderHeader = () => {
    return (
      <Header>
        <Title>
          <FontAwesomeIcon icon={faCalendarAlt} /> College Events Calendar
        </Title>
        <Navigation>
          <NavButton onClick={prevMonth}>
            <FontAwesomeIcon icon={faChevronLeft} />
            Previous
          </NavButton>
          <MonthYear>
            {format(currentDate, 'MMMM yyyy')}
          </MonthYear>
          <NavButton onClick={nextMonth}>
            Next
            <FontAwesomeIcon icon={faChevronRight} />
          </NavButton>
          <ViewToggle>
            <ViewButton 
              active={view === 'month'} 
              onClick={() => setView('month')}
            >
              Month
            </ViewButton>
            <ViewButton 
              active={view === 'week'} 
              onClick={() => setView('week')}
            >
              Week
            </ViewButton>
          </ViewToggle>
          <NewEventButton>
            <FontAwesomeIcon icon={faPlus} /> Add Event
          </NewEventButton>
        </Navigation>
      </Header>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEE';
    const startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <CalendarHeader key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </CalendarHeader>
      );
    }

    return <>{days}</>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const dayEvents = events.filter(event => isSameDay(event.date, cloneDay));
        
        days.push(
          <CalendarDay key={day.toString()}>
            <DayNumber
              isCurrentMonth={isSameMonth(day, monthStart)}
              isToday={isSameDay(day, new Date())}
            >
              {formattedDate}
            </DayNumber>
            <EventsContainer>
              {dayEvents.slice(0, 3).map(event => (
                <EventItem 
                  key={event.id} 
                  color={event.color}
                  onClick={() => setSelectedEvent(event)}
                >
                  <EventIcon>
                    <FontAwesomeIcon icon={event.icon} />
                  </EventIcon>
                  {event.title}
                </EventItem>
              ))}
              {dayEvents.length > 3 && (
                <EventItem color="secondary">
                  +{dayEvents.length - 3} more events
                </EventItem>
              )}
            </EventsContainer>
          </CalendarDay>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} style={{ display: 'contents' }}>
          {days}
        </div>
      );
      days = [];
    }
    return <>{rows}</>;
  };

  return (
    <Container>
      {renderHeader()}
      <CalendarGrid>
        {renderDays()}
        {renderCells()}
      </CalendarGrid>

      {selectedEvent && (
        <EventModal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                <FontAwesomeIcon icon={selectedEvent.icon} />
                {selectedEvent.title}
              </ModalTitle>
              <CloseButton onClick={() => setSelectedEvent(null)}>×</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <EventDetail>
                <DetailLabel>
                  <FontAwesomeIcon icon={faCalendarAlt} /> Date
                </DetailLabel>
                <DetailValue>
                  {format(selectedEvent.date, 'EEEE, MMMM d, yyyy')}
                </DetailValue>
              </EventDetail>
              
              <EventDetail>
                <DetailLabel>
                  <FontAwesomeIcon icon={faClock} /> Time
                </DetailLabel>
                <DetailValue>{selectedEvent.time}</DetailValue>
              </EventDetail>
              
              <EventDetail>
                <DetailLabel>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> Location
                </DetailLabel>
                <DetailValue>{selectedEvent.location}</DetailValue>
              </EventDetail>
              
              <EventDetail>
                <DetailLabel>
                  <FontAwesomeIcon icon={faUsers} /> Expected Attendees
                </DetailLabel>
                <DetailValue>{selectedEvent.attendees} people</DetailValue>
              </EventDetail>
              
              <EventDetail>
                <DetailLabel>
                  <FontAwesomeIcon icon={selectedEvent.icon} /> Description
                </DetailLabel>
                <DetailValue>{selectedEvent.description}</DetailValue>
              </EventDetail>
            </ModalBody>
            
            <ModalFooter>
              <SecondaryButton>Save to Calendar</SecondaryButton>
              <ActionButton>Register Now</ActionButton>
              <SecondaryButton onClick={() => setSelectedEvent(null)}>
                Close
              </SecondaryButton>
            </ModalFooter>
          </ModalContent>
        </EventModal>
      )}
    </Container>
  );
};

export default EventCalendar;