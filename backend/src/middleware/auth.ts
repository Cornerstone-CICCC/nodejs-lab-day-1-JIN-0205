import { Request, Response, NextFunction } from "express";

export const cookieAuthCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAuthenticated } = req.signedCookies;
  console.log("cookie:", req.signedCookies);
  if (isAuthenticated) {
    next();
  } else {
    res.status(403).json({ message: "Authentication required" });
  }
};
