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
const user_model_1 = __importDefault(require("../models/user.model"));
const hash_util_1 = require("../utils/hash.util");
const getUsers = (req, res) => {
    const users = user_model_1.default.findAll();
    res.json(users);
};
const getUserById = (req, res) => {
    const { id } = req.params;
    // console.log(req);
    const foundUser = user_model_1.default.findById(id);
    if (!foundUser) {
        res.status(404).send("User not found");
    }
    res.json(foundUser);
    return;
};
// Add user
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstname, lastname } = req.body;
    // console.log(req.body);
    const hashedPassword = yield (0, hash_util_1.hashed)(password);
    const user = user_model_1.default.createUser({
        username,
        password: hashedPassword,
        firstname,
        lastname,
    });
    res.status(201).json({
        message: "User created successfully",
        redirect: "/login",
    });
});
// Update user by id
const updateUserById = (req, res) => {
    const { id } = req.params;
    const { username, firstname, lastname } = req.body;
    const user = user_model_1.default.editUser(id, { username, firstname, lastname });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.status(200).json(user);
};
// Delete user by id
const deleteUserById = (req, res) => {
    const { id } = req.params;
    const isDeleted = user_model_1.default.deleteUser(id);
    if (!isDeleted) {
        res.status(404).send("User not found");
        return;
    }
    res.status(200).send("User deleted!");
};
// Check auth
// Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = user_model_1.default.findByUsername(username);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    const isMatch = yield (0, hash_util_1.compareHash)(password, user.password);
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
});
// Check auth profile
const userProfile = (req, res) => {
    res.status(200).json({ message: "You are allowed to view the page" });
};
// Logout user
const logoutUser = (req, res) => {
    res.clearCookie("isAuthenticated", { httpOnly: true, signed: true });
    res.clearCookie("userId", { httpOnly: true, signed: true });
    res.status(200).json({ message: "Logged out and cleared cookies" });
};
// getProfile 関数
const getProfile = (req, res) => {
    const userId = req.signedCookies.userId;
    const user = user_model_1.default.findById(userId);
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
exports.default = {
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
