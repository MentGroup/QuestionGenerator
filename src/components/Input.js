import React, { useState } from 'react';

function InputForm({ onGenerate, setLoading }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3007/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      onGenerate(data.questions); // Send questions to parent component
    } catch (error) {
      console.error('Error generating questions:', error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="input-textarea"
        placeholder="Enter your essay or prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="button-container">
        <button type="submit" className="generate-btn">
          Generate Questions
        </button>
      </div>
    </form>
  );
}

export default InputForm;
