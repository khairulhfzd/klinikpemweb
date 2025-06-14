import express from "express";
import { registerUser, loginUser, logoutUser, me } from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/register', registerUser);  // <--- tambahkan ini
router.post('/login', loginUser);
router.delete('/logout', logoutUser);
router.get('/me', verifyToken, me);

export default router;
