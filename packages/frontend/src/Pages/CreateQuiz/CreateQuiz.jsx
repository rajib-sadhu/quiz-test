import { useLocation, useParams } from "react-router-dom";
import useShowQuiz from "../../hooks/useShowQuiz";
import useTestDetails from "../../hooks/useTestDetails";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { useState } from "react";
import AddQuestion from "../../components/AddQuestion/AddQuestion";
import QuestionBox from "../../components/QuestionBox/QuestionBox";

const CreateQuiz = () => {
  const { id } = useParams();

  const [testDetails, loadingTest] = useTestDetails(id);
  const [showQuiz, loadingAllQuiz, refetchShowQuiz] = useShowQuiz(id);

  const [addQuestion, setAddQuestion] = useState(false);

  const handleAddQuestion = () => {
    setAddQuestion(!addQuestion);
  };

  const {
    _id,
    testName,
    testDescription,
    testDuration,
    testMark,
    testNegativeMark,
    startDate,
    endDate,
    tags,
    testId,
  } = testDetails;

  if (loadingAllQuiz && loadingTest) {
    return (
      <div className="flex justify-center mt-10">
        <LoadingAnimation />{" "}
      </div>
    );
  }

  return (
    <div className="mt-3 px-2">
      <div>
        <h1 className="text-center text-xl font-bold">{testName}</h1>
        <p className="text-center">{testDescription}</p>
        <div className="grid md:gap-3 gap-2 grid-cols-2 font-medium p-2 bg-red-100 rounded text-sm mt-2">
          <div className="space-y-1">
            <h4>Test Duration: {testDuration} min</h4>
            <h4>Per Correct Answer: {testMark}</h4>
            <h4>Per Wrong Answer: {testNegativeMark}</h4>
            <h4>Total Marks: {showQuiz?.length * testMark}</h4>
          </div>
          <div>
            {/* <h4>
              Creator:{" "}
              {testDetails?.ownerDetails?.length != 0 &&
                testDetails?.ownerDetails[0]?.name}
            </h4> */}
            <h4>Test Start: {startDate || "NA"}</h4>
            <h4>Test End: {endDate || "NA"}</h4>
            <h4>Total Questions: {showQuiz?.length}</h4>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <button
          className="bg-red-800 text-white px-3 py-1 rounded"
          onClick={handleAddQuestion}
        >
          {addQuestion ? "Close" : "Add Question"}
        </button>
      </div>

      <div className="mt-3 mb-20">
        {addQuestion && (
          <AddQuestion
            testId={testId}
            handleAddQuestion={handleAddQuestion}
            refetchShowQuiz={refetchShowQuiz}
          />
        )}
      </div>

      <section className="space-y-5 my-5">
        <h1 className="text-xl font-semibold">All Questions</h1>
        {showQuiz?.map((value, index) => (
          <QuestionBox
            key={value?._id}
            value={value}
            index={index}
            refetchShowQuiz={refetchShowQuiz}
          />
        ))}
      </section>
    </div>
  );
};

export default CreateQuiz;
