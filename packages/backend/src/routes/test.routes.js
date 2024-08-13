import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createTest, getTestDetails, removeTest, showAllTests } from "../controllers/test.controller.js";

const router = Router();

router.route("/create").post(verifyJwt, createTest);
router.route("/show-all").get(verifyJwt, showAllTests);
router.route("/show").get(verifyJwt, getTestDetails);
router.route("/remove").delete(verifyJwt, removeTest);


export default router;