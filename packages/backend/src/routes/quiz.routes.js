import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createQuiz, getAllQuizzes } from "../controllers/quiz.controller.js";

const router = Router();

router.route("/create").post(verifyJwt, createQuiz);
router.route("/show-all").get(verifyJwt, getAllQuizzes);

export default router;
