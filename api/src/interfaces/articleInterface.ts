import { Document } from "mongoose";

interface ArticleInt extends Document {
  _id: String;
  title?: String;
  description?: String;
  tag?: String;
  user?: String;
  reviews?: String[];
}

export default ArticleInt;
