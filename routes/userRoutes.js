import express from "express";
import { create, login, fetch, update, deleteUser } from "../controller/userController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { createUserSchema, loginSchema, updateUserSchema } from "../validators/userValidator.js";

const router = express.Router();

router.post("/create", validate(createUserSchema), create);
router.post("/login", validate(loginSchema), login);

router.get("/fetch", protectRoute, fetch);
router.put("/update/:id", protectRoute, validate(updateUserSchema), update);
router.delete("/delete/:id", protectRoute, deleteUser);

export default router;