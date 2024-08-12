import { allStatusCode } from "../constants.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { Test } from "../models/test.models.js";

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

  if (
    [testName, testDuration, testDescription].some(
      (field) => field === undefined || field.trim() === ""
    )
  ) {
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

export { createTest, showAllTests };
