import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCheck, faTimes, faRedo, faChartBar } from '@fortawesome/free-solid-svg-icons';

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

const QuizzesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const QuizCard = styled.div`
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
  background-color: rgba(67, 97, 238, 0.1);
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

const CardDescription = styled.p`
  margin: 0 0 1.5rem 0;
  opacity: 0.9;
`;

const StartButton = styled.button`
  width: 100%;
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

const QuizContainer = styled.div`
  background-color: var(--dark-card);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  max-width: 800px;
  margin: 0 auto;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const QuestionTitle = styled.h2`
  margin: 0;
  color: var(--primary-color);
`;

const QuestionCounter = styled.div`
  background-color: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius);
  font-weight: 500;
`;

const QuestionText = styled.h3`
  margin: 2rem 0;
  font-size: 1.3rem;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const OptionButton = styled.button<{ selected?: boolean; correct?: boolean; incorrect?: boolean }>`
  padding: 1rem;
  background-color: ${props => {
    if (props.correct) return 'rgba(76, 175, 80, 0.2)';
    if (props.incorrect) return 'rgba(244, 67, 54, 0.2)';
    if (props.selected) return 'rgba(67, 97, 238, 0.3)';
    return 'rgba(255, 255, 255, 0.05)';
  }};
  border: 1px solid ${props => {
    if (props.correct) return 'var(--success-color)';
    if (props.incorrect) return 'var(--error-color)';
    if (props.selected) return 'var(--primary-color)';
    return 'rgba(255, 255, 255, 0.1)';
  }};
  border-radius: var(--border-radius);
  color: var(--text-light);
  text-align: left;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: ${props => {
      if (props.correct || props.incorrect) return '';
      return 'rgba(67, 97, 238, 0.2)';
    }};
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const NavButton = styled.button`
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
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const ResultsContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const ScoreDisplay = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: var(--primary-color);
  margin: 2rem 0;
`;

const ScoreText = styled.h2`
  color: var(--text-light);
  margin-bottom: 2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
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

const Quizzes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Mock data for quizzes
  const quizzes = [
    {
      id: 1,
      title: 'Mathematics Quiz 1',
      subject: 'Mathematics',
      questions: 10,
      duration: '15 mins',
      description: 'Test your knowledge on basic calculus and algebra concepts.'
    },
    {
      id: 2,
      title: 'Physics Midterm',
      subject: 'Physics',
      questions: 15,
      duration: '30 mins',
      description: 'Comprehensive quiz covering mechanics and thermodynamics.'
    },
    {
      id: 3,
      title: 'Chemistry Basics',
      subject: 'Chemistry',
      questions: 12,
      duration: '20 mins',
      description: 'Fundamental concepts in atomic structure and chemical bonding.'
    },
    {
      id: 4,
      title: 'Computer Science Fundamentals',
      subject: 'Computer Science',
      questions: 20,
      duration: '40 mins',
      description: 'Programming concepts, algorithms, and data structures.'
    }
  ];

  // Mock data for quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What is the derivative of x^2?",
      options: ["2x", "x^2", "2x^2", "x"],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "What is the value of π (pi) approximately?",
      options: ["3.14", "2.71", "1.41", "1.73"],
      correctAnswer: 0
    },
    {
      id: 3,
      question: "What is the integral of 1/x?",
      options: ["ln(x)", "x^2/2", "e^x", "x"],
      correctAnswer: 0
    }
  ];

  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    quiz.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startQuiz = (quizId: number) => {
    setCurrentQuiz(quizId);
    setCurrentQuestion(0);
    setSelectedAnswers(Array(quizQuestions.length).fill(-1));
    setShowResults(false);
  };

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(quizQuestions.length).fill(-1));
    setShowResults(false);
  };

  const goBackToQuizzes = () => {
    setCurrentQuiz(null);
    setShowResults(false);
  };

  // Calculate score
  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  if (currentQuiz !== null && showResults) {
    const score = calculateScore();
    const total = quizQuestions.length;
    const percentage = Math.round((score / total) * 100);
    
    return (
      <Container>
        <ResultsContainer>
          <h1>Quiz Results</h1>
          <ScoreDisplay>{percentage}%</ScoreDisplay>
          <ScoreText>You scored {score} out of {total} questions correctly</ScoreText>
          
          <ActionButtons>
            <ActionButton onClick={restartQuiz}>
              <FontAwesomeIcon icon={faRedo} />
              Retry Quiz
            </ActionButton>
            <ActionButton onClick={goBackToQuizzes}>
              <FontAwesomeIcon icon={faChartBar} />
              View All Quizzes
            </ActionButton>
          </ActionButtons>
        </ResultsContainer>
      </Container>
    );
  }

  if (currentQuiz !== null) {
    const question = quizQuestions[currentQuestion];
    const selectedAnswer = selectedAnswers[currentQuestion];
    
    return (
      <Container>
        <QuizContainer>
          <QuestionHeader>
            <QuestionTitle>Mathematics Quiz</QuestionTitle>
            <QuestionCounter>Question {currentQuestion + 1} of {quizQuestions.length}</QuestionCounter>
          </QuestionHeader>
          
          <QuestionText>{question.question}</QuestionText>
          
          <OptionsList>
            {question.options.map((option, index) => (
              <OptionButton
                key={index}
                selected={selectedAnswer === index}
                correct={showResults && index === question.correctAnswer}
                incorrect={showResults && selectedAnswer === index && index !== question.correctAnswer}
                onClick={() => !showResults && selectAnswer(index)}
              >
                {option}
              </OptionButton>
            ))}
          </OptionsList>
          
          <NavigationButtons>
            <NavButton 
              onClick={goToPreviousQuestion} 
              disabled={currentQuestion === 0}
            >
              Previous
            </NavButton>
            {currentQuestion < quizQuestions.length - 1 ? (
              <NavButton onClick={goToNextQuestion}>
                Next
              </NavButton>
            ) : (
              <NavButton onClick={submitQuiz}>
                Submit Quiz
              </NavButton>
            )}
          </NavigationButtons>
        </QuizContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Quizzes & Practice Tests</Title>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </Header>

      <QuizzesGrid>
        {filteredQuizzes.map(quiz => (
          <QuizCard key={quiz.id}>
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardMeta>
                <span>{quiz.subject}</span>
                <span>{quiz.questions} questions</span>
              </CardMeta>
            </CardHeader>
            <CardBody>
              <CardDescription>{quiz.description}</CardDescription>
              <StartButton onClick={() => startQuiz(quiz.id)}>
                <FontAwesomeIcon icon={faPlay} />
                Start Quiz
              </StartButton>
            </CardBody>
          </QuizCard>
        ))}
      </QuizzesGrid>
    </Container>
  );
};

export default Quizzes;