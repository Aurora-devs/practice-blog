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

// @desc Get a article
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

// @desc Get all the articles
// @route GET /api/articles
// @access public

const getArticles = asyncHandler(
  async (req: GetUserAuthInforRequest, res: Response) => {
    const articles = await Article.find({});

    if (articles) {
      res.json(articles);
    }

    throw new Error("No Article");
  },
);

// @desc Create a comment
// @route GET /api/articles/:id/comment
// @access private

const createreviewForArticle = asyncHandler(
  async (req: GetUserAuthInforRequest, res: Response) => {
    const comment = req.body.comment;
    const article = await Article.findById(req.params.id);

    if (article) {
      const alreadyCommented = article.reviews?.find(
        (r: any) => r.user.toString() === req.user?._id.toString(),
      ) as any;

      if (alreadyCommented) {
        res.status(400);
        throw new Error("Already reviewed");
      }

      const review = {
        user: req.user?._id,
        comment,
      } as any;

      article.reviews?.push(review);
      await article.save();
    } else {
      res.status(404);
      throw new Error("Article not found");
    }
  },
);

// @desc Create a comment
// @route GET /api/articles/:id
// @access private

const updateArticle = asyncHandler(
  async (req: GetUserAuthInforRequest, res: Response) => {
    const article: any = await Article.findById(req.params.id);

    if (article) {
      if (article?.user?.toString() === req.user?._id.toString()) {
        const { title, description, tag } = req.body;
        article.title = title || article?.title;
        article.description = description || article?.description;

        await article.save();
        res.json(article);
      } else {
        res.status(400);
        throw new Error("You are not the author");
      }
    } else {
      res.status(404);
      throw new Error(`Article with id: ${req.params.id} don't exist`);
    }
  },
);

export {
  createArticle,
  getArticle,
  getArticles,
  createreviewForArticle,
  updateArticle,
};
