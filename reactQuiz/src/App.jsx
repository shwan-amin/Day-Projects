import { useState } from 'react'
import FrontPage from './components/FrontPage.jsx';
import QuizPage from './components/QuizPage.jsx';
import './App.css'

function App() {
  // Set the quiz to initially show the title screen
  const [quizActive, setQuizActive] = useState(false);

  /**
   * Function that handles the starting of the game
   */
  const handleStartQuiz = () => {
    setQuizActive(true);
    return;
  }

  return (
    <>
      {!quizActive ? <FrontPage handleStartQuiz={handleStartQuiz}/> : <QuizPage />}
    </>
  )
}

export default App
