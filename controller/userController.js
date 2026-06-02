import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export const login = async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        const userExists = await userModel.findOne({ email });
        if (userExists) throw new AppError("User already exists", 400);

        const newUser = new userModel({ email, password, name });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
};

export const fetch = async (req, res, next) => {
    try {
        const users = await userModel.find();
        if (users.length === 0) throw new AppError("No users found", 404);

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) throw new AppError("User doesn't exist", 404);

        const { password, role, ...safeFields } = req.body;

        Object.keys(safeFields).forEach((key) => {
            user[key] = safeFields[key];
        });

        const updatedUser = await user.save();
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) throw new AppError("User doesn't exist", 404);

        res.status(200).json({ message: "Deleted successfully", user });
    } catch (error) {
        next(error);
    }
};