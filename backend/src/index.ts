import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGO_CONNECTION as string);

const app = express();
app.use(cookieParser());
app.use(express.json()); //convert body of requests to json automatically
app.use(express.urlencoded({ extended: true })); //helps for parsing url
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
); //allows frontend and backend to communicate with each other

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(8000, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
