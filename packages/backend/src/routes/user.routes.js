import { Router } from "express";
import {
  getCurrentUser,
  registerUser,
  sendAccessToken,
  updateUserDetails,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/jwt").post(sendAccessToken);
router.route("/user-details").get(verifyJwt, getCurrentUser);
router.route("/user-details").put(verifyJwt, updateUserDetails);

export default router;
