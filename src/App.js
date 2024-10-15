import React, { useState } from 'react';
import InputForm from './components/Input'; // Path to InputForm
import './styles/App.css'; // Import your styles
import mentIcon from './assets/MENT-Icon.jpeg'; // Import the logo

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateQuestions = (newQuestions) => {
    setQuestions(newQuestions); // Update the questions to display
  };

  return (
    <div className="App">
      <div className="top-bar">
        <img src={mentIcon} alt="MENT Logo" className="logo" />
        <span className="header-title">MENT</span>
      </div>

      <h1>Question Generator</h1>

      <div className="input-form-container">
        <InputForm onGenerate={generateQuestions} />
      </div>

      {/* Display Questions */}
      <div className="questions-container">
        {questions.length > 0 && (
          <>
            <h2>Generated Questions:</h2>
            <ul>
              {questions.map((question, index) => (
                <li key={index} className="question">
                  {question}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
