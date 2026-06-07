import mongoose from "mongoose";
import dotenv from "dotenv";
import userModel from "./src/model/userModel.js";

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected");

        const adminExists = await userModel.findOne({ role: "admin" });
        if (adminExists) {
            console.log("Admin already exists, skipping...");
            process.exit(0);
        }

        // create the first admin
        await userModel.create({
    name: "Super Admin",
    email: process.env.MyEmail,
    password: process.env.MyPassword,
    role: "admin"
});

        console.log("Admin created successfully");
        console.log(process.env.MyEmail);
        console.log(process.env.MyPassword);

        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error.message);
        process.exit(1);
    }
};

seed();