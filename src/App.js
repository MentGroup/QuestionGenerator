import React, { useState } from 'react';
import InputForm from './components/Input'; // Path to InputForm
import './styles/App.css'; // Import your styles
import mentIcon from './assets/MENT-Icon.jpeg'; // Import the logo
import { FaRegCopy, FaDownload, FaArrowLeft } from 'react-icons/fa'; // Import icons
import jsPDF from 'jspdf'; // Import jsPDF for PDF functionality

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(''); // Keep track of user input
  const [editingIndex, setEditingIndex] = useState(null); // Track which question is being edited

  const generateQuestions = (newQuestions) => {
    setQuestions(newQuestions); // Update the questions to display
    setLoading(false); // Stop loading when questions are ready
  };

  const handleBack = () => {
    setQuestions([]); // Reset questions
    setLoading(false); // Stop loading
  };

  const handleDownload = () => {
    const fileName = window.prompt("Enter the name for your PDF:", "questions");
  
    if (fileName) { // Proceed only if a name is entered
      const doc = new jsPDF();
      
      // Set the title for the PDF
      doc.setFontSize(16); // Set the title font size
      doc.text('Generated Questions:', 10, 10);
  
      doc.setFontSize(12); // Set the font size for questions
      let y = 20; // Start y position for questions
      const lineHeight = 10; // Define line height
  
      questions.forEach((question, index) => {
        const questionText = `${index + 1}. ${question}`;
        const splitText = doc.splitTextToSize(questionText, 190); // Wrap text to fit within a specified width (190)
  
        // Check if the current position exceeds the page limit
        if (y + splitText.length * lineHeight > doc.internal.pageSize.height - 10) {
          doc.addPage(); // Add a new page
          y = 10; // Reset y position for the new page
        }
  
        // Add each line of the wrapped text
        splitText.forEach((line) => {
          doc.text(line, 10, y); // Adjust horizontal position if needed
          y += lineHeight; // Move y position down for the next line
        });
      });
  
      doc.save(`${fileName}.pdf`); // Use the custom filename
    }
  };
  
  const handleCopy = () => {
    const numberedQuestions = questions.map((question, index) => `${index + 1}. ${question}`).join('\n'); // Add numbering
    navigator.clipboard.writeText(numberedQuestions)
      .then(() => {
        alert("Questions copied to clipboard!"); // Optional: Show success message
      })
      .catch(err => {
        console.error("Error copying text: ", err);
      });
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value; // Update the question
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
            prompt={prompt} // Pass the current prompt state
            setPrompt={setPrompt} // Allow updating of the prompt state
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
                        onBlur={() => setEditingIndex(null)} // Hide input when losing focus
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            setEditingIndex(null); // Hide input on Enter
                          }
                        }}
                        autoFocus // Automatically focus the input when it is rendered
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
