// routes/jadwalRoutes.js
import express from "express";
import { getJadwal, getJadwalById } from "../controllers/JadwalController.js";

const router = express.Router();

router.get("/jadwal", getJadwal);
router.get("/jadwal/:id", getJadwalById);

export default router;
