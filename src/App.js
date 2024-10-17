import React, { useState } from 'react';
import InputForm from './components/Input';
import './styles/App.css';
import mentIcon from './assets/MENT-Icon.jpeg';
import { FaRegCopy, FaDownload, FaArrowLeft } from 'react-icons/fa';
import jsPDF from 'jspdf';

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const generateQuestions = (newQuestions) => {
    setQuestions(newQuestions);
    setLoading(false);
  };

  const handleBack = () => {
    setQuestions([]);
    setLoading(false);
  };

  const handleDownload = () => {
    const fileName = window.prompt("Enter the name for your PDF:", "questions");

    if (fileName) {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Generated Questions:', 10, 10);
      doc.setFontSize(12);
      let y = 20;
      const lineHeight = 10;

      questions.forEach((question, index) => {
        const questionText = `${index + 1}. ${question}`;
        const splitText = doc.splitTextToSize(questionText, 190);

        if (y + splitText.length * lineHeight > doc.internal.pageSize.height - 10) {
          doc.addPage();
          y = 10;
        }

        splitText.forEach((line) => {
          doc.text(line, 10, y);
          y += lineHeight;
        });
      });

      doc.save(`${fileName}.pdf`);
    }
  };

  const handleCopy = () => {
    const numberedQuestions = questions.map((question, index) => `${index + 1}. ${question}`).join('\n');
    navigator.clipboard.writeText(numberedQuestions)
      .then(() => {
        alert("Questions copied to clipboard!");
      })
      .catch(err => {
        console.error("Error copying text: ", err);
      });
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
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
          <InputForm 
            onGenerate={generateQuestions} 
            setLoading={setLoading} 
            prompt={prompt} 
            setPrompt={setPrompt} 
          />
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
                <button className="action-btn" onClick={handleBack}>
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
                    {editingIndex === index ? (
                      <textarea
                        value={question}
                        className="question-input"
                        onChange={(e) => handleQuestionChange(index, e.target.value)}
                        onBlur={() => setEditingIndex(null)} 
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            setEditingIndex(null);
                          }
                        }}
                        autoFocus 
                      />
                    ) : (
                      <span onClick={() => setEditingIndex(index)}>
                        {question}
                      </span>
                    )}
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
