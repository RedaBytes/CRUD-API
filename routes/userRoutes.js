import express from "express";
import { create, login, fetch, update, deleteUser } from "../controller/userController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { createUserSchema, loginSchema, updateUserSchema } from "../validators/userValidator.js";
import { limiter, authLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/create", authLimiter, validate(createUserSchema), create);
router.post("/login", authLimiter, validate(loginSchema), login);

router.get("/fetch", protectRoute, fetch);
router.put("/update/:id", protectRoute, validate(updateUserSchema), update);
router.delete("/delete/:id", protectRoute, deleteUser);

export default router;