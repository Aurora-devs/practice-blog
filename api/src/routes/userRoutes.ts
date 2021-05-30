import {
  registerUser,
  loginUser,
  userProfile,
  getUserProfile,
  deleteProfile,
  updateProfile,
} from "../controllers/userContoroller";

import express from "express";
import { protect } from "../middlewares/authMiddleWare";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router
  .route("/profile")
  .get(protect, userProfile)
  .delete(protect, deleteProfile)
  .put(protect, updateProfile);
router.route("/:id").get(protect, getUserProfile);

export default router;
