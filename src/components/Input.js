// Input.js
import React, { useState } from 'react';

function InputForm({ onGenerate }) {
  const [text, setText] = useState('');

  const handleGenerate = () => {
    onGenerate(text);
  };

  return (
    <div>
      <textarea
        className="input-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your paragraph here..."
      />
      <button className="generate-btn" onClick={handleGenerate}>
        Generate Questions
      </button>
    </div>
  );
}

export default InputForm;
