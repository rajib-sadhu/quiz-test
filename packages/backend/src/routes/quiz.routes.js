import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createQuiz,
  getAllQuizzes,
  removeQuiz,
  updateQuiz,
} from "../controllers/quiz.controller.js";

const router = Router();

router.route("/create").post(verifyJwt, createQuiz);
router.route("/show").get(verifyJwt, getAllQuizzes);
router.route("/update").put(verifyJwt, updateQuiz);
router.route("/remove").delete(verifyJwt, removeQuiz);

export default router;
