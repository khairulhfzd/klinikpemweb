import express from "express";
import {
  getDokters,
  getDokterById,
  createDokter,
  updateDokter,
  deleteDokter
} from "../controllers/DokterController.js";
import upload from "../middleware/UploadFoto.js";

const router = express.Router();

router.get('/dokters', getDokters);
router.get('/dokters/:id', getDokterById);
router.post('/dokters', upload.single("foto"), createDokter);
router.patch('/dokters/:id', upload.single("foto"), updateDokter);
router.delete('/dokters/:id', deleteDokter);

export default router;
