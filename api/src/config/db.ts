import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log("Mongo connected");
};

export default connectDB;
