import express from "express";
import { getCurrentUser, login, signup, logout } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/signup",upload.single("profileImage"), signup);
router.post("/login", login);
router.get("/me", getCurrentUser);
router.post("/logout", logout);

export default router;
