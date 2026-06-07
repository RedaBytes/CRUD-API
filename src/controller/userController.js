import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import asyncHandler from "express-async-handler";

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) throw new AppError("User not found", 404);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new AppError("Invalid credentials", 400);

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.status(200).json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});

export const create = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) throw new AppError("User already exists", 400);

    const newUser = new userModel({ email, password, name });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
});

export const fetch = asyncHandler(async (req, res) => {
    const users = await userModel.find();
    if (users.length === 0) throw new AppError("No users found", 404);

    res.status(200).json(users);
});

export const update = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);
    if (!user) throw new AppError("User doesn't exist", 404);

    const { password, role, ...safeFields } = req.body;

    Object.keys(safeFields).forEach((key) => {
        user[key] = safeFields[key];
    });

    const updatedUser = await user.save();
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
});

export const deleteUser = asyncHandler(async (req, res) => {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) throw new AppError("User doesn't exist", 404);

    res.status(200).json({ message: "Deleted successfully", user });
});

export const makeAdmin = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);
    if (!user) throw new AppError("User not found", 404);

    if (user.role === "admin") {
        throw new AppError("User is already an admin", 400);
    }

    user.role = "admin";
    await user.save();

    res.status(200).json({
        message: "User promoted to admin successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    });
});