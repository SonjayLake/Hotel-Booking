import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import bookingRoutes from "./routes/my-bookings";
import path from "path";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", bookingRoutes);

//catch all route
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(8000, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
