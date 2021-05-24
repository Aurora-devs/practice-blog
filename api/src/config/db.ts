import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb://127.0.0.1:27017/file_upload", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log("Mongo connected");
};

export default connectDB;
