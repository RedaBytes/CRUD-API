import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import app from "./app.js";
import connectDB from "./src/config/db.js";
dotenv.config();

const PORT=process.env.PORT || 5000;
const MONGODB = process.env.MONGODB_URL;


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});