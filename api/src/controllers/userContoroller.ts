import { Request, Response } from "express";
import User from "../models/userModel";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";

import UserInt from "../interfaces/userInterface";
import Article from "../models/articleModel";

export interface GetUserAuthInforRequest extends Request {
  user?: UserInt;
}

// @desc Register new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const alreadyExists = await User.findOne({ email });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (alreadyExists) {
    res.status(400);
    throw new Error("already register with this email");
  }

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const newUser = await user.save();
    res.status(201).json({
      name,
      email,
      hashedPassword,
      token: generateToken(newUser._id.toString()),
    });
  } else {
    res.status(400);
    throw new Error("Bad data");
  }
});

// @desc Login a user
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(
  async (req: GetUserAuthInforRequest, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordUser = user?.password.toString()!;
    if (user && (await bcrypt.compare(password, passwordUser))) {
      res.json({
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  },
);

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

const userProfile = asyncHandler(
  async (req: GetUserAuthInforRequest, res: Response) => {
    const user = await User.findById(req.user?._id);

    const articleUser = await Article.find({ user: req.user?._id });

    if (user) {
      if (articleUser.length > 0) {
        const jsonRes = {
          user,
          articleUser,
        };
        res.json(jsonRes);
      } else {
        const jsonRes = {
          user,
          articleUser: "No article",
        };

        res.json(jsonRes);
      }
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  },
);

// @desc Get user profile
// @route GET /api/users/:id
// @access Private

const getUserProfile = asyncHandler(
  async (req: GetUserAuthInforRequest, res: Response) => {
    const user = await User.findById(req.params.id);

    const articleUser = await Article.find({ user: req.params.id });

    if (user) {
      if (articleUser.length > 0) {
        const jsonRes = {
          user,
          articleUser,
        };
        res.json(jsonRes);
      } else {
        const jsonRes = {
          user,
          articleUser: "No article",
        };

        res.json(jsonRes);
      }
    } else {
      res.status(404);
      throw new Error(`User with id: ${req.params.id} not fond`);
    }
  },
);

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateProfile = asyncHandler(
  async (req: GetUserAuthInforRequest, res: Response) => {
    let user = await User.findById(req.user?._id);
    const { email, name, password } = req.body;
    const salt = await bcrypt.genSalt(10);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
      }
    } else {
      res.status(404);
      throw new Error("User not found");
    }

    await user.save();

    res.json(user);
  },
);

// @desc Delete user profile
// @route DELETE /api/users/profile
// @access Private

const deleteProfile = asyncHandler(
  async (req: GetUserAuthInforRequest, res: Response) => {
    const user = await User.findById(req.user?._id);

    if (user) {
      await user.remove();
    } else {
      res.json(404);
      throw new Error(`User with id : ${req.user?._id} not found`);
    }
  },
);

export {
  registerUser,
  loginUser,
  userProfile,
  deleteProfile,
  getUserProfile,
  updateProfile,
};
