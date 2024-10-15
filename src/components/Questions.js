import React from 'react';
import '../styles/Questions.css'

const Questions = ({ questions }) => {
  return (
    <div className="questions-container">
      {questions.map((question, index) => (
        <div key={index} className="question">
          {question}
        </div>
      ))}
    </div>
  );
};

export default Questions;
