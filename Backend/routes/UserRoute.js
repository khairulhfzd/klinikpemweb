import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/UserController.js";
import upload from "../middleware/UploadFoto.js";

const router = express.Router();
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', upload.single("foto"), createUser);
router.patch('/users/:id', upload.single("foto"), updateUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
export default router;
