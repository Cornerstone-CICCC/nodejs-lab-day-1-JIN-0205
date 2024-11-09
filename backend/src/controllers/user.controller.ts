import userModel from "../models/user.model";
import { Request, Response } from "express";
import { compareHash, hashed } from "../utils/hash.util";
import { User } from "../models/user.model";

const getUsers = (req: Request, res: Response) => {
  const users = userModel.findAll();
  res.json(users);
};

const getUserById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  // console.log(req);
  const foundUser = userModel.findById(id);
  if (!foundUser) {
    res.status(404).send("User not found");
  }
  res.json(foundUser);
  return;
};

// Add user
const addUser = async (req: Request<{}, {}, User>, res: Response) => {
  const { username, password, firstname, lastname } = req.body;
  // console.log(req.body);
  const hashedPassword = await hashed(password);
  const user = userModel.createUser({
    username,
    password: hashedPassword,
    firstname,
    lastname,
  });
  res.status(201).json({
    message: "User created successfully",
    redirect: "/login",
  });
};
// Update user by id
const updateUserById = (
  req: Request<{ id: string }, {}, User>,
  res: Response
) => {
  const { id } = req.params;
  const { username, firstname, lastname } = req.body;
  const user = userModel.editUser(id, { username, firstname, lastname });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json(user);
};
// Delete user by id
const deleteUserById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const isDeleted = userModel.deleteUser(id);
  if (!isDeleted) {
    res.status(404).send("User not found");
    return;
  }
  res.status(200).send("User deleted!");
};

// Check auth

// Login user
const loginUser = async (req: Request<{}, {}, User>, res: Response) => {
  const { username, password } = req.body;
  const user = userModel.findByUsername(username);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const isMatch = await compareHash(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: "Password is invalid " });
    return;
  }
  res.cookie("isAuthenticated", true, {
    httpOnly: true,
    maxAge: 3 * 60 * 1000,
    signed: true,
  });
  res.cookie("userId", user.id, {
    httpOnly: true,
    maxAge: 3 * 60 * 1000,
    signed: true,
  });
  res
    .status(200)
    .json({ message: "Login authenticated", redirect: "/profile" });
};
// Check auth profile
const userProfile = (req: Request, res: Response) => {
  res.status(200).json({ message: "You are allowed to view the page" });
};
// Logout user
const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("isAuthenticated", { httpOnly: true, signed: true });
  res.clearCookie("userId", { httpOnly: true, signed: true });
  res.status(200).json({ message: "Logged out and cleared cookies" });
};
// getProfile 関数
const getProfile = (req: Request, res: Response) => {
  const userId = req.signedCookies.userId;
  const user = userModel.findById(userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
  });
};

export default {
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
  loginUser,
  userProfile,
  logoutUser,
  getProfile,
};
