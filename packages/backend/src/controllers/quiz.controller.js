import { allStatusCode } from "../constants.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { Quiz } from "../models/quiz.models.js";
import { Test } from "../models/test.models.js"; // Import Test model if needed

// Function to add index to answers
const addAnswerIndexes = (answers) => {
  return answers.map((answer, index) => ({
    ...answer,
    index: index + 1, // Automatically set index 1, 2, 3, 4
  }));
};

// Validate answers for a question
const validateAnswers = (answers) => {
  if (answers.length !== 4) {
    return "Each question must have exactly four answers.";
  }

  const correctAnswers = answers.filter((answer) => answer.isCorrect);
  if (correctAnswers.length !== 1) {
    return "Each question must have exactly one correct answer.";
  }

  return null;
};

// Create a new quiz
const createQuiz = asyncHandler(async (req, res) => {
  const { question, testId } = req.body;

  if (!testId || !question || !Array.isArray(question.answers)) {
    return res
      .status(allStatusCode.clientError)
      .json(
        new ApiError(
          allStatusCode.clientError,
          "Test ID and question with answers are required."
        )
      );
  }

  // Verify if the testId exists in the Test collection
  const testExists = await Test.findOne({ testId });
  if (!testExists) {
    return res
      .status(allStatusCode.clientError)
      .json(
        new ApiError(
          allStatusCode.clientError,
          "The specified test does not exist."
        )
      );
  }

  // Add indexes to answers
  const indexedAnswers = addAnswerIndexes(question.answers);

  // Validate the answers
  const validationError = validateAnswers(indexedAnswers);
  if (validationError) {
    return res
      .status(allStatusCode.clientError)
      .json(new ApiError(allStatusCode.clientError, validationError));
  }

  // Create the quiz
  const newQuiz = await Quiz.create({
    question: { ...question, answers: indexedAnswers },
    testId,
  });

  return res
    .status(allStatusCode.success)
    .json(
      new APIResponse(
        allStatusCode.success,
        newQuiz,
        "Quiz created successfully."
      )
    );
});

const getAllQuizzes = asyncHandler(async (req, res) => {
  const { testId } = req?.query;

  if (!testId) {
    return res
      .status(allStatusCode.clientError)
      .json(
        new ApiError(
          allStatusCode.clientError,
          "Please provide correct test id."
        )
      );
  }

  const quizzes = await Quiz.find({ testId });

  if (!quizzes) {
    return res
      .status(allStatusCode.clientError)
      .json(new ApiError(allStatusCode.clientError, "Not quizzes provided."));
  }

  return res
    .status(allStatusCode.success)
    .json(
      new APIResponse(
        allStatusCode.success,
        quizzes,
        "Quizzes fetched successfully."
      )
    );
});

const updateQuiz = asyncHandler(async (req, res) => {
  const { updatedQuestionAnswer, id } = req.body;

  if (
    !id ||
    !updatedQuestionAnswer ||
    !Array.isArray(updatedQuestionAnswer.answers)
  ) {
    return res
      .status(allStatusCode.clientError)
      .json(
        new ApiError(
          allStatusCode.clientError,
          "ID and question with answers are required."
        )
      );
  }

  const indexedAnswers = updatedQuestionAnswer.answers;

  // Validate answers
  const validationError = validateAnswers(indexedAnswers);
  if (validationError) {
    return res
      .status(allStatusCode.clientError)
      .json(new ApiError(allStatusCode.clientError, validationError));
  }

  // Update the quiz
  const update = await Quiz.updateOne(
    { _id: id },
    {
      $set: {
        "question.text": updatedQuestionAnswer.text, // Update question text
        "question.answers": indexedAnswers, // Update answers array
      },
    }
  );

  if (update.nModified === 0) {
    return res
      .status(allStatusCode.clientError)
      .json(new ApiError(allStatusCode.clientError, "No changes made."));
  }

  return res
    .status(allStatusCode.success)
    .json(
      new APIResponse(
        allStatusCode.success,
        update,
        "Quiz updated successfully."
      )
    );
});

const removeQuiz = asyncHandler(async (req, res) => {
  const { id } = req?.query;

  if (!id) {
    return res
      .status(allStatusCode.clientError)
      .json(
        new ApiError(
          allStatusCode.clientError,
          "ID and question with answers are required."
        )
      );
  }

  try {
    const deleteQuiz = await Quiz.deleteOne({ _id: id });

    if (deleteQuiz?.deletedCount == 0) {
      return res
        .status(allStatusCode.notFound)
        .json(
          new ApiError(
            allStatusCode.notFound,
            "This id of quiz already deleted or not found."
          )
        );
    }

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          deleteQuiz,
          "Quiz delete successfully."
        )
      );
  } catch (error) {
    console.log("Delete Quiz Error:", error);
  }
});

export { createQuiz, getAllQuizzes, updateQuiz, removeQuiz };
