import mongoose, { Schema } from "mongoose";

const testSchema = new Schema(
  {
    testName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    testDescription: {
      type: String,
      trim: true,
    },
    testDuration: {
      type: Number,
      trim: true,
      required: true,
    },
    testMark: {
      type: Number,
      default: 1,
      required: true,
    },
    testNegativeMark: {
      type: Number,
      default: 0,
      required: true,
    },
    startDate: {
      type: String,
      trim: true,
    },
    endDate: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
    },
    testId: {
      type: String,
      unique: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Test = mongoose.model("Test", testSchema);
