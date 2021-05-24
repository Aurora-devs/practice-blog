import {
  createArticle,
  getArticle,
  getArticles,
  createreviewForArticle,
  updateArticle,
} from "../controllers/articleController";
import express from "express";
import { protect } from "../middlewares/authMiddleWare";

const router = express.Router();

router.route("/").get(getArticles);
router.route("/new").post(protect, createArticle);
router.route("/:id").get(protect, getArticle).put(protect, updateArticle);
router.route("/:id/comment").post(createreviewForArticle);

export default router;
