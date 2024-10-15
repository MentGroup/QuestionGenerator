import React, { useState } from 'react';
import axios from 'axios'; 

function InputForm({ onGenerate }) {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle the submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText) {
      setLoading(true); 
      try {

        const response = await axios.post('http://localhost:3007/generate-questions', {
          prompt: inputText
        });

        
        const { questions } = response.data;

        
        onGenerate(questions);

      } catch (error) {
        console.error('Error generating questions:', error);
        alert('Error generating questions. Please try again.');
      } finally {
        setLoading(false); // Stop loading animation
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <textarea
        className="input-textarea"
        placeholder="Enter your paragraph here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className="button-container">
        <button type="submit" className="generate-btn" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Questions'}
        </button>
      </div>
    </form>
  );
}

export default InputForm;
