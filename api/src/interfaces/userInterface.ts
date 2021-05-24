import { Document } from "mongoose";
interface UserInt extends Document {
  _id: String;
  name: String;
  email: String;
  password: String;
  isAdmin: String;
  created: String;
}

export default UserInt;
