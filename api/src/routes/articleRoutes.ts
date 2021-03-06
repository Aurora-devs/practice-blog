import {
  createArticle,
  getArticle,
  getArticles,
  createreviewForArticle,
  updateArticle,
  likeOrUnlikeArticle,
  deleteArticle,
} from "../controllers/articleController";
import express from "express";
import { protect, isAuthor } from "../middlewares/authMiddleWare";

const router = express.Router();

router.route("/").get(getArticles);
router.route("/new").post(protect, createArticle);
router
  .route("/:id")
  .get(protect, getArticle)
  .put(protect, isAuthor, updateArticle)
  .delete(protect, isAuthor, deleteArticle);
router.route("/:id/comment").post(protect, createreviewForArticle);
router.route("/:id/like").post(protect, likeOrUnlikeArticle);

export default router;
