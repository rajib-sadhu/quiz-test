import React, { useState } from 'react';

const AddQuestion = ({ handleAddQuestion, refetchShowQuiz }) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSaveQuestion = e => {
    e.preventDefault();
    // You can now send the question and answers array to the parent component or API
    const newQuestion = {
      question,
      answers,
    };
    console.log(newQuestion);
    // Example: handleAddQuestion(newQuestion);
  };

  return (
    <div className="border-2 border-red-500 p-2 rounded-md">
      <h3 className="text-lg font-medium text-center uppercase underline">Add Question</h3>
      <form className="py-2" onSubmit={handleSaveQuestion}>
        <input
          type="text"
          placeholder="Write Your Question"
          className="border-b border-red-800 w-full px-2 py-2 outline-none text-lg font-medium"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <div className="mt-4 space-y-2">
          {answers.map((answer, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Answer ${index + 1}`}
              className="border border-red-800 w-full px-2 py-2 outline-none text-lg font-medium"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          ))}
        </div>
        <div className="text-right mt-5 space-x-1">
          <button type="submit" className="px-3 py-1 bg-red-950 text-white rounded">Save</button>
          <button onClick={handleAddQuestion} className="px-3 py-1 border border-red-950 rounded">Close</button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
