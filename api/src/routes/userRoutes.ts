import {
  registerUser,
  loginUser,
  userProfile,
} from "../controllers/userContoroller";

import express from "express";
import { protect } from "../middlewares/authMiddleWare";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(protect, userProfile);

export default router;
