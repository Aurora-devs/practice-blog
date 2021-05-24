import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./src/config/db";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes";

dotenv.config();
// Db call
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use(cors());

// api routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Serversunnig on port ${PORT}`));
