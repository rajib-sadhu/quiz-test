import { allStatusCode } from "../constants.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { Test } from "../models/test.models.js";
import { ObjectId } from "mongodb";
import { Quiz } from "../models/quiz.models.js";

const generateUniqueTestId = async (userEmail) => {
  let testId;
  let isUnique = false;

  while (!isUnique) {
    // Generate testId
    testId = userEmail.slice(0, 4) + Math.round(Math.random() * 1000);

    // Check if testId is unique
    const checkTestId = await Test.findOne({ testId });

    if (!checkTestId) {
      isUnique = true;
    }
  }

  return testId;
};

const createTest = asyncHandler(async (req, res) => {
  const {
    testName,
    testDescription,
    testDuration,
    testMark,
    testNegativeMark,
    startDate,
    endDate,
    tags,
  } = req.body;

  if (!testName || !testDuration || !testDescription) {
    return res
      .status(allStatusCode.clientError)
      .json(
        new ApiError(
          allStatusCode.clientError,
          "Please fill the required fields"
        )
      );
  }

  const checkTestName = await Test.findOne({
    testName,
    owner: req?.user?.id,
  });

  if (checkTestName) {
    return res
      .status(allStatusCode.clientError)
      .json(
        new ApiError(
          allStatusCode.clientError,
          `${testName} is already created.`
        )
      );
  }

  const testId = await generateUniqueTestId(req?.user?.email);

  const create = await Test.create({
    testName,
    testDescription,
    testDuration: parseInt(testDuration),
    testMark: parseInt(testMark) || 1,
    testNegativeMark: parseInt(testNegativeMark) || 0,
    startDate,
    endDate,
    tags,
    testId,
    owner: req?.user?._id,
  });

  return res
    .status(allStatusCode.success)
    .json(
      new APIResponse(
        allStatusCode.success,
        create,
        "Test create successfully."
      )
    );
});

const showAllTests = asyncHandler(async (req, res) => {
  const showTests = await Test.find({ owner: req?.user?._id });

  if (showTests.length === 0) {
    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(allStatusCode.success, [], "User don't have any test..")
      );
  }

  return res
    .status(allStatusCode.success)
    .json(
      new APIResponse(
        allStatusCode.success,
        showTests,
        "User all tests fetch successfully."
      )
    );
});

const getTestDetails = asyncHandler(async (req, res) => {
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

  const test = await Test.aggregate([
    { $match: { testId: testId } },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
      },
    },
  ]);

  if (!test) {
    return res
      .status(allStatusCode.clientError)
      .json(new ApiError(allStatusCode.clientError, "Test id is not valid."));
  }

  return res
    .status(allStatusCode.success)
    .json(
      new APIResponse(allStatusCode.success, test, "Tes fetched successfully.")
    );
});

const removeTest = asyncHandler(async (req, res) => {
  const { testId } = req.query;

  if (!testId) {
    return res
      .status(allStatusCode.clientError)
      .json(
        new ApiError(
          allStatusCode.clientError,
          "test id and question with answers are required."
        )
      );
  }

  try {
    const deleteQuiz = await Quiz.deleteMany({ testId });

    if (!deleteQuiz?.acknowledged) {
      return res
        .status(allStatusCode.notFound)
        .json(
          new ApiError(
            allStatusCode.notFound,
            "This id of quiz already deleted or not found."
          )
        );
    }

    const deleteTest = await Test.deleteOne({ testId });

    if (deleteTest?.deletedCount == 0) {
      return res
        .status(allStatusCode.notFound)
        .json(
          new ApiError(
            allStatusCode.notFound,
            "This id of test already deleted or not found."
          )
        );
    }

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          deleteTest,
          "Quiz delete successfully."
        )
      );
  } catch (error) {
    console.log("Delete Quiz Error:", error);
  }
});

export { createTest, showAllTests, getTestDetails, removeTest };
