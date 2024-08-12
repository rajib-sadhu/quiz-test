import React, { useState } from "react";
import toast from "react-hot-toast";

const AddQuestion = ({ handleAddQuestion, refetchShowQuiz }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].text = value;
    setAnswers(updatedAnswers);
  };

  const handleCorrectAnswerChange = (index) => {
    const updatedAnswers = answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === index,
    }));
    setAnswers(updatedAnswers);
  };

  const handleSaveQuestion = (e) => {
    e.preventDefault();

    // Validation: Check if question is filled
    if (!question.trim()) {
      toast.error("Please enter a question.");
      return;
    }

    // Validation: Check if all answer fields are filled
    if (answers.some((answer) => !answer.text.trim())) {
      toast.error("Please fill out all answer fields.");
      return;
    }

    // Validation: Check if at least one correct answer is selected
    if (!answers.some((answer) => answer.isCorrect)) {
      toast.error("Please select at least one correct answer.");
      return;
    }

    // If validation passes, create the new question object
    const newQuestion = {
      question,
      answers,
    };
    console.log(newQuestion);
    // Example: handleAddQuestion(newQuestion);
  };

  return (
    <div className="border-2 border-red-500 p-2 rounded-md">
      <h3 className="text-lg font-medium text-center uppercase underline">
        Add Question
      </h3>
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
            <div className="flex items-center gap-2" key={index}>
              <input
                type="text"
                placeholder={`Answer ${index + 1}`}
                className="border border-red-800 w-full px-2 py-1 outline-none text-lg font-medium"
                value={answer.text}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
              <input
                type="radio"
                name="isCorrect"
                className="cursor-pointer"
                checked={answer.isCorrect}
                onChange={() => handleCorrectAnswerChange(index)}
              />
            </div>
          ))}
        </div>
        <div className="text-right mt-5 space-x-1">
          <button
            type="submit"
            className="px-3 py-1 bg-red-950 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={handleAddQuestion}
            className="px-3 py-1 border border-red-950 rounded"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
