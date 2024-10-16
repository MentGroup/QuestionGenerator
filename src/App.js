import React, { useState } from 'react';
import InputForm from './components/Input'; // Path to InputForm
import './styles/App.css'; // Import your styles
import mentIcon from './assets/MENT-Icon.jpeg'; // Import the logo
import { FaRegCopy, FaDownload, FaArrowLeft } from 'react-icons/fa'; // Import icons
import jsPDF from 'jspdf'; // Import jsPDF for PDF functionality

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateQuestions = (newQuestions) => {
    setQuestions(newQuestions); // Update the questions to display
  };

  const handleCopy = () => {
    const questionsText = questions.join('\n');
    navigator.clipboard.writeText(questionsText);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text('Generated Questions:', 10, 10);
    questions.forEach((question, index) => {
      doc.text(`${index + 1}. ${question}`, 10, 20 + index * 10);
    });
    doc.save('questions.pdf');
  };

  return (
    <div className="App">
      <div className="top-bar">
        <img src={mentIcon} alt="MENT Logo" className="logo" />
        <span className="header-title">MENT</span>
      </div>
  
      <h1>Question Generator</h1>
  
      <div className="input-form-container">
        {!loading && questions.length === 0 && (
          <InputForm onGenerate={generateQuestions} setLoading={setLoading} />
        )}
  {loading && (
  <div className="loading-container">
    <div className="spinner"></div>
    <div className="loading-text">Generating Questions...</div>
  </div>
)}


        
        {!loading && questions.length > 0 && (
          <>
            <div className="questions-title-container">
  <h2 className="generated-title">Questions Generated:</h2>
  <div className="button-container">
    <button className="action-btn" onClick={() => {/* Logic to go back */}}>
      <FaArrowLeft /> Back
    </button>
    <button className="action-btn" onClick={handleCopy}>
      <FaRegCopy /> Copy
    </button>
    <button className="action-btn" onClick={handleDownload}>
      <FaDownload /> Download
    </button>
  </div>
</div>

            <div className="questions-container">
              <ul>
                {questions.map((question, index) => (
                  <li key={index} className="question">
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
