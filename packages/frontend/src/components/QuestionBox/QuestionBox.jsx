import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/axiosSecure";
import Swal from "sweetalert2";

const QuestionBox = ({ value, index, refetchShowQuiz }) => {
  const question = value?.question;
  const answers = question?.answers;

  const [boxEdit, setBoxEdit] = useState(false);

  const [axiosSecure] = useAxiosSecure();

  // Initialize state based on the passed question and answers
  const [editedQuestion, setEditedQuestion] = useState(question?.text || "");
  const [editedAnswers, setEditedAnswers] = useState(
    answers || [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]
  );

  // Effect to reset state when boxEdit changes
  useEffect(() => {
    if (boxEdit) {
      setEditedQuestion(question?.text || "");
      setEditedAnswers(
        answers || [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ]
      );
    }
  }, [boxEdit, question, answers]);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...editedAnswers];
    updatedAnswers[index].text = value;
    setEditedAnswers(updatedAnswers);
  };

  const handleCorrectAnswerChange = (index) => {
    const updatedAnswers = editedAnswers.map((answer, i) => ({
      ...answer,
      isCorrect: i === index,
    }));
    setEditedAnswers(updatedAnswers);
  };

  const handleEditQuestion = async (e) => {
    e.preventDefault();

    // Validation: Check if question is filled
    if (!editedQuestion.trim()) {
      toast.error("Please enter a question.");
      return;
    }

    // Validation: Check if all answer fields are filled
    if (editedAnswers.some((answer) => !answer.text.trim())) {
      toast.error("Please fill out all answer fields.");
      return;
    }

    // Validation: Check if at least one correct answer is selected
    if (!editedAnswers.some((answer) => answer.isCorrect)) {
      toast.error("Please select at least one correct answer.");
      return;
    }

    const updatedQuestionAnswer = {
      question: {
        text: editedQuestion,
        answers: editedAnswers,
        testId: value?.testId,
      },
    };

    try {
      const res = await axiosSecure.put("/quiz/update", {
        updatedQuestionAnswer: updatedQuestionAnswer?.question,
        id: value?._id,
      });

      const data = res.data;
      refetchShowQuiz();
      toast.success("Quiz updated successfully!");
      setBoxEdit(false);
    } catch (error) {
      console.error("Quiz update error:", error);
      toast.error("Quiz not updated!");
    }
  };

  const handleQuizRemove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/quiz/remove?id=${id}`);
          const data = res?.data;

          if (data?.success) {
            refetchShowQuiz();
            Swal.fire({
              title: "Deleted!",
              text: data?.message,
              icon: "success",
            });
          }
        } catch (error) {
          console.error("Quiz delete Error:", error);

          Swal.fire({
            title: "Not Deleted!",
            text: "Your quiz has been not deleted.",
            icon: "error",
          });
        }
      }
    });
  };

  const TextWithNewlines = (text) => {
    const formattedText = text.replace(/\n/g, "<br />");

    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  return (
    <div className="bg-red-200 p-2 rounded relative">
      <div className="text-right space-x-2 ">
        {boxEdit ? (
          <div className="absolute top-2 right-20">
            <button
              onClick={() => {
                setBoxEdit(false);
                setEditedAnswers(answers);
              }}
              className="rounded px-2 py-1 border border-slate-700 hover:bg-black hover:text-white"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setBoxEdit(true);
              }}
              className="rounded px-2 py-1 bg-green-700 hover:bg-green-600 text-white"
            >
              Edit
            </button>
            <button
              onClick={() => handleQuizRemove(value?._id)}
              className="rounded px-2 py-1 bg-red-700 hover:bg-red-500 text-white"
            >
              Delete
            </button>
          </>
        )}
      </div>
      <form onSubmit={handleEditQuestion}>
        <div className="text-right">
          {boxEdit && (
            <button
              type="submit" // This button should submit the form
              className="rounded px-2 py-1 bg-blue-700 hover:bg-blue-600 text-white"
            >
              Update
            </button>
          )}
        </div>
        <div className="pb-5">
          {boxEdit && (
            <h4 className="px-2 font-medium">
              Please edit your question and answers.
            </h4>
          )}
        </div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          {index + 1}.{" "}
          {boxEdit ? (
            <textarea
              className="w-full md:h-20 p-2"
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
            />
          ) : (
            <p>{TextWithNewlines(question?.text)}</p>
          )}
        </h3>
        <ul className="space-y-1 mt-2">
          {editedAnswers?.map((val, i) => (
            <li
              key={i}
              className={`${
                val?.isCorrect ? "bg-green-300 font-medium" : "bg-white"
              } p-2 flex items-center gap-3`}
            >
              <p
                className={` ${
                  val?.isCorrect ? "bg-white" : "bg-red-800 text-white"
                } min-w-6 min-h-6 rounded-full flex justify-center items-center`}
              >
                {i + 1}
              </p>
              <div className="w-full">
                {boxEdit ? (
                  <div className="flex items-center gap-2">
                    <textarea
                      className="px-2 bg-slate-200 w-full"
                      value={val.text}
                      onChange={(e) => handleAnswerChange(i, e.target.value)}
                    />
                    <input
                      type="radio"
                      name={`isCorrect-${index}`}
                      className="cursor-pointer"
                      checked={val.isCorrect}
                      onChange={() => handleCorrectAnswerChange(i)}
                    />
                  </div>
                ) : (
                  <p>{TextWithNewlines(val?.text)}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default QuestionBox;
