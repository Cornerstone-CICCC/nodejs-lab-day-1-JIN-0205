"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Create your server
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
// Create server
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:4321", // Astro port
    credentials: true, // allow cookies
}));
app.use((0, cookie_parser_1.default)("fdha3uiqaehdfei4q3"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/", user_routes_1.default);
app.get("/api/test", (req, res) => {
    res.cookie("authToken", true, {
        httpOnly: true,
        maxAge: 3 * 60 * 1000,
        signed: true,
    });
    res.status(200).json({
        connected: true,
    });
});
// 404 Fallback
app.use((req, res) => {
    res.status(404).send("Invalid route");
});
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
