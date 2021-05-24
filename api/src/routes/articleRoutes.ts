import { createArticle, getArticle } from "../controllers/articleController";
import express from "express";
import { protect } from "../middlewares/authMiddleWare";

const router = express.Router();

router.route("/").post(protect, createArticle);
router.route("/:id").get(protect, getArticle);

export default router;
