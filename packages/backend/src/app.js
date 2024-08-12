import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { FILE_SIZE_LIMIT } from "./constants.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: FILE_SIZE_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: FILE_SIZE_LIMIT }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes Import
import userRouter from "./routes/user.routes.js";
import testRouter from "./routes/test.routes.js";
import quizRouter from "./routes/quiz.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tests", testRouter);
app.use("/api/v1/quiz", quizRouter);

export default app;
