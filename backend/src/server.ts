// Create your server
import express, { Request, Response } from "express";
import pageRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";
import cors from "cors";

// Create server
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:4321", // Astro port
    credentials: true, // allow cookies
  })
);
app.use(cookieParser("fdha3uiqaehdfei4q3"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", pageRouter);
app.get("/api/test", (req: Request, res: Response) => {
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
app.use((req: Request, res: Response) => {
  res.status(404).send("Invalid route");
});

const PORT: number = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
