import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createTest, getTestDetails, showAllTests } from "../controllers/test.controller.js";

const router = Router();

router.route("/create").post(verifyJwt, createTest);
router.route("/show-all").get(verifyJwt, showAllTests);
router.route("/show").get(verifyJwt, getTestDetails);


export default router;