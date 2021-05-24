import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

console.log(process.env.JWT_SECRET!);

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "3600s",
  });
};

export default generateToken;
