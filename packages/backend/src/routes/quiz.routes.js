import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createQuiz,
  getAllQuizzes,
  updateQuiz,
} from "../controllers/quiz.controller.js";

const router = Router();

router.route("/create").post(verifyJwt, createQuiz);
router.route("/show").get(verifyJwt, getAllQuizzes);
router.route("/update").put(verifyJwt, updateQuiz);

export default router;
