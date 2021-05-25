import express from "express";
import connectDB from "./src/config/db";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes";
import articleRoutes from "./src/routes/articleRoutes";
import dotenv from "dotenv";

dotenv.config();
// Db call
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use(cors());

// api routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));
