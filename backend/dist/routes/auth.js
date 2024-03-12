"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../middleware/auth"));
let router = express_1.default.Router();
router.post("/login", [
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password must be at least 6 characters").isLength({
        min: 6,
    }),
], function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //check for valid login input parameters
        let errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: errors });
        }
        let { password, email } = req.body;
        //validate login information
        let user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).send({
                error: "Invalid credentials",
            });
        }
        let validPass = yield bcryptjs_1.default.compare(password, user ? user.password : "");
        if (!validPass) {
            return res.status(400).send({
                error: "Invalid credentials",
            });
        }
        //return cookie for valid login info
        let token = jsonwebtoken_1.default.sign({ userId: user ? user._id : "ERROR" }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        return res.status(200).json({
            userId: user._id,
        });
    });
});
router.get("/validate-token", auth_1.default, (req, res) => {
    res.status(200).send({ userId: req.userId });
});
router.post("/logout", (req, res) => {
    res.cookie("auth_token", "", {
        expires: new Date(0), // token expires at time of creation
    });
    return res.send();
});
exports.default = router;
