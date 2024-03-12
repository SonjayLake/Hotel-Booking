"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
mongoose_1.default.connect(process.env.MONGO_CONNECTION);
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json()); //convert body of requests to json automatically
app.use(express_1.default.urlencoded({ extended: true })); //helps for parsing url
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
})); //allows frontend and backend to communicate with each other
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.listen(8000, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
