import { Request, Response } from "express";
import User from "../models/userModel";
import asyncHandler from "express-async-handler";
import Article from "../models/articleModel";

import UserInt from "../interfaces/userInterface";

export interface GetUserAuthInforRequest extends Request {
  user?: UserInt;
}

// @desc Create a new article
// @route POST /api/articles
// @access private

const createArticle = asyncHandler(
  async (req: GetUserAuthInforRequest, res: Response) => {
    const { title, description } = req.body;
    const user = req.user;

    const tag = req.body.tag.split(" ");

    const newArticle = new Article({
      title,
      description,
      tag,
      user,
    });

    await newArticle.save();

    res.json(newArticle);
  },
);

// @desc Create a new article
// @route GET /api/articles/:id
// @access private
const getArticle = asyncHandler(
  async (req: GetUserAuthInforRequest, res: Response) => {
    const article = await Article.findById(req.params.id).populate(
      "user",
      "email",
    );

    if (article) {
      res.json(article);
    }

    throw new Error(`Article with id: ${req.params.id} not find`);
  },
);

export { createArticle, getArticle };
