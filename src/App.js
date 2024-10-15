import React, { useState } from 'react';
import InputForm from './components/Input'; // Ensure this is the correct path
import Questions from './components/Questions'; // Ensure this is the correct path
import mentIcon from './assets/MENT-Icon.jpeg'; // Ensure logo path is correct
import './styles/App.css'; // Path to the CSS file

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateQuestions = async (text) => {
    setLoading(true);
    setTimeout(() => {
      const mockQuestions = [
        "What is the main idea of the paragraph?",
        "How would you summarize the content?"
      ];
      setQuestions(mockQuestions);
      setLoading(false);
    }, 2000); // Simulate a 2-second delay
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

      {!loading && questions.length > 0 && (
        <Questions questions={questions} />
      )}

      {loading && <div className="loader">Generating Questions...</div>}
    </div>
  );
}

export default App;
