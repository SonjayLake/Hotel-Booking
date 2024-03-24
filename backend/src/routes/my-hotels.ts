import express, { Request, Response } from "express";
import cloudinary from "cloudinary";
import multer from "multer";
import Hotel from "../models/hotel";
import {HotelType} from "../shared/types";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5 MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // upload img to cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        const base64 = Buffer.from(image.buffer).toString("base64"); //convert image to base64 string to be processed by cloudinary
        let dataURI = "data:" + image.mimetype + ";base64," + base64;

        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });

      const imageURLS = await Promise.all(uploadPromises);
      newHotel.imageUrls = imageURLS;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel); //document object referencing schema
      await hotel.save();

      res.status(201).send(hotel);
    } catch (error) {
      console.log("Error creating hotel: ", error);
      res.status(500).json({ message: "Something went wrong." });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

export default router;
