import React from "react";

const QuestionBox = ({ value, index }) => {
  const question = value?.question;
  const answers = question?.answers;

  return (
    <div className="bg-red-200 p-2 rounded">
      <h3 className="text-xl font-medium">
        {index + 1}. {question?.text}
      </h3>
      <ul className="space-y-1 mt-2">
        {answers?.map((val) => {
          return (
            <li
              key={val?.index}
              className={`${
                val?.isCorrect ? "bg-green-300 font-medium" : "bg-white"
              } p-2 flex items-center gap-1`}
            >
              <p
                className={` ${
                  val?.isCorrect ? "bg-white" : "bg-red-800 text-white"
                } w-6 h-6 rounded-full grid place-content-center`}
              >
                {val?.index}
              </p>
              {val?.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuestionBox;
