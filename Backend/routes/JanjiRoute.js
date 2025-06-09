import express from "express";
import {
  createJanji,
  getAllJanji,
  getJanjiById,
  updateJanji,
  deleteJanji
} from "../controllers/JanjiController.js";

const router = express.Router();

router.get("/janji", getAllJanji);
router.get("/janji/:id", getJanjiById);
router.post("/janji", createJanji);
router.patch("/janji/:id", updateJanji);
router.delete("/janji/:id", deleteJanji);

export default router;
