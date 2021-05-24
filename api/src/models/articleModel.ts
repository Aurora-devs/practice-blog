import mongoose from "mongoose";
import ArticleInt from "../interfaces/articleInterface";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
    // rating: {
    //   type: Number,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  },
);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required",
  },
  description: {
    type: String,
    required: "Description is required",
  },
  tag: [
    {
      type: String,
      default: "",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  reviews: [reviewSchema],
  likes: [
    {
      user: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const Article = mongoose.model<ArticleInt>("Article", articleSchema);
export default Article;
