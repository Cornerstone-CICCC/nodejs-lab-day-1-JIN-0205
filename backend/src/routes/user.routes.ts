import { Router, Request, Response } from "express";
import userController from "../controllers/user.controller";
import { cookieAuthCheck } from "../middleware/auth";

const userRouter = Router();

userRouter.get("/users", userController.getUsers);

userRouter.post("/signup", userController.addUser);
userRouter.post("/login", userController.loginUser);

userRouter.get("/auth", cookieAuthCheck, userController.userProfile);
userRouter.get("/logout", userController.logoutUser);
userRouter.get("/profile", cookieAuthCheck, userController.getProfile);

userRouter.get("/users/:id", userController.getUserById);
userRouter.put("/users/:id", userController.updateUserById);
userRouter.delete("/users/:id", userController.deleteUserById);

export default userRouter;
