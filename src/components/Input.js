import React from 'react';

function InputForm({ onGenerate, setLoading, prompt, setPrompt }) {

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
        placeholder="Enter your description here..."
        value={prompt} // Bind the value to the prompt state
        onChange={(e) => setPrompt(e.target.value)} // Update prompt state on change
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
