import React, { useState } from 'react';

function InputForm({ onGenerate }) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText) {
      onGenerate(inputText);
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
        <button type="submit" className="generate-btn">Generate Questions</button>
      </div>
    </form>
  );
}

export default InputForm;
