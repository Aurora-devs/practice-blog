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
    const { title, description, thumbnail } = req.body;
    const user = req.user;

    const tags = [];
    const tag = req.body.tag.split(" ");
    for (let index = 0; index < tag.length; index++) {
      if (tag[index] !== "") {
        tags.push(tag[index]);
      }
    }

    const newArticle = new Article({
      title,
      description,
      user,
      thumbnail,
      tag: tags,
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
    const article = (await Article.findById(req.params.id).populate(
      "user",
      "name",
    )) as any;

    const user = req.user?._id;
    const articleAuthor = article?.user._id;

    if (!article) {
      throw new Error(`Article with id: ${req.params.id} not find`);
    }

    if (user?.toString() === articleAuthor.toString()) {
      res.json({ article, edit: true });
    } else {
      res.json({ article, edit: false });
    }
  },
);

// @desc Get all the articles
// @route GET /api/articles
// @access public

const getArticles = asyncHandler(
  async (req: GetUserAuthInforRequest, res: Response) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          $or: [
            {
              title: {
                $regex: req.query.keyword,
                $options: "i",
              },
            },
            {
              tag: {
                $regex: req.query.keyword,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const count = await Article.countDocuments({ ...keyword } as any);

    const articles = await Article.find({ ...keyword } as any)
      .populate("user", "name")
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    if (articles.length > 0) {
      res.json({ articles, page, pages: Math.ceil(count / pageSize) });
    } else if (keyword) {
      res.status(404);
      res.json("No article found");
    } else {
      res.status(404);
      throw new Error("No Article ");
    }
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

      res.json("Comment submited");
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
      const { title, description, thumbnail } = req.body;

      const tags = [];
      const tag = req.body.tag.split(" ");
      for (let index = 0; index < tag.length; index++) {
        if (tag[index] !== "") {
          tags.push(tag[index]);
        }
      }

      article.title = title || article?.title;
      article.description = description || article?.description;
      article.thumbnail = thumbnail || article.thumbnail;
      article.tag = tags || article.tag;

      await article.save();
      res.json(article);
    } else {
      res.status(404);
      throw new Error(`Article with id: ${req.params.id} don't exist`);
    }
  },
);

// @desc Create a like
// @route Post /api/articles/:id/like
// @access private

const likeOrUnlikeArticle = asyncHandler(
  async (req: GetUserAuthInforRequest, res: Response) => {
    const article = await Article.findById(req.params.id);

    if (article) {
      const alreadyLiked = article.likes?.find(
        (r: any) => r.user.toString() === req.user?._id.toString(),
      );

      if (!alreadyLiked) {
        const liked = {
          user: req.user?._id,
        } as any;

        article.likes?.push(liked);
        await article.save();

        res.json("liked");
      } else {
        const indexOf = article.likes
          ?.map((like: any) => like.user.toString())
          .indexOf(req.user?.id) as any;

        console.log(indexOf);

        await article.likes?.splice(indexOf, 1);
        await article.save();

        res.json("like removed");
      }
    } else {
      res.status(404);
      throw new Error(`Article with id: ${req.params.id} not found`);
    }
  },
);

// @desc Create a like
// @route Post /api/articles/:id
// @access private

const deleteArticle = asyncHandler(
  async (req: GetUserAuthInforRequest, res: Response) => {
    const article = await Article.findById(req.params.id);
    if (article) {
      await article.remove();

      res.json("deleted");
    } else {
      res.status(404);
      throw new Error(`Article with id: ${req.params.id} is not found`);
    }
  },
);

export {
  createArticle,
  getArticle,
  getArticles,
  createreviewForArticle,
  updateArticle,
  likeOrUnlikeArticle,
  deleteArticle,
};
