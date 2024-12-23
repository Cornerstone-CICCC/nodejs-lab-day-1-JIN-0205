"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieAuthCheck = void 0;
const cookieAuthCheck = (req, res, next) => {
    const { isAuthenticated } = req.signedCookies;
    console.log("cookie:", req.signedCookies);
    if (isAuthenticated) {
        next();
    }
    else {
        res.status(403).json({ message: "Authentication required" });
    }
};
exports.cookieAuthCheck = cookieAuthCheck;
