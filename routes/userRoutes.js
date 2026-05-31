import express from "express";
import { create, login, fetch, update, deleteUser } from "../controller/userController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", create);
router.post("/login", login);

router.get("/fetch", protectRoute, fetch);
router.put("/update/:id", protectRoute, update);
router.delete("/delete/:id", protectRoute, deleteUser);

export default router;