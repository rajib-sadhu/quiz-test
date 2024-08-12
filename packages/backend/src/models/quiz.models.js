import mongoose, { Schema } from "mongoose";

// Define the schema for an answer
const answerSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
    required: true,
  },
  index: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4], // Ensure values are within 1 to 4
  },
});

// Define the schema for a question
const questionSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  answers: [answerSchema],
});

// Define the schema for the quiz
const quizSchema = new Schema(
  {
    question: questionSchema,
    testId: {
      type: String,
      required: true,
      //   ref: "Test", // Link to the Test model
    },
  },
  { timestamps: true }
);

export const Quiz = mongoose.model("Quiz", quizSchema);
