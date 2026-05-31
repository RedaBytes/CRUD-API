import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

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
        console.error("Login error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const { email, password, name, address } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new userModel({ email, password, name,  });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Create user error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const fetch = async (req, res) => {
    try {
        const users = await userModel.find();

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Fetch users error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        const { password, role, ...safeFields } = req.body;

        Object.keys(safeFields).forEach((key) => {
            user[key] = safeFields[key];
        });

        const updatedUser = await user.save();

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Update user error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        res.status(200).json({ message: "Deleted successfully", user });
    } catch (error) {
        console.error("Delete user error:", error.message);
        res.status(500).json({ error: error.message });
    }
};