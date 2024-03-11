import express, { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserType } from "../models/User";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";

let router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async function (req: Request, res: Response) {
    //check for valid login input parameters
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ message: errors });
    }

    let { password, email } = req.body;

    //validate login information
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        error: "Invalid credentials",
      });
    }
    let validPass = await bcrypt.compare(password, user ? user.password : "");

    if (!validPass) {
      return res.status(400).send({
        error: "Invalid credentials",
      });
    }

    //return cookie for valid login info
    let token = jwt.sign(
      { userId: user ? user._id : "ERROR" },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res.status(200).json({
      userId: user._id,
    });
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0), // token expires at time of creation
  });
  return res.send();
});

export default router;
