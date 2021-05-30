import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import User from "../models/userModel";
import Article from "../models/articleModel";
import UserInt from "../interfaces/userInterface";

dotenv.config({ path: __dirname + "/.env" });

interface GetUserAuthInforRequest extends Request {
  user?: UserInt | null;
}
interface jwtPayload {
  id: string;
  usermame: string;
  email: string;
}

const protect = asyncHandler(
  async (req: GetUserAuthInforRequest, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwtPayload;

        req.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authotized, no token");
    }
  },
);

const isAuthor = asyncHandler(
  async (req: GetUserAuthInforRequest, res: Response, next: NextFunction) => {
    try {
      const article = (await Article.findById(req.params._id)) as any;
      const articleAuthor = article.user;
      console.log(article);
      console.log(articleAuthor);

      if (req.user?._id.toString() === articleAuthor._id) {
        next();
      }
    } catch (error) {
      res.status(401);
      throw new Error("You are not the author");
    }
  },
);

export { protect, isAuthor };
