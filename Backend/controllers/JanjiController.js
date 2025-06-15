// controllers/JanjiController.js
import Janji from "../models/JanjiModel.js";
import Dokter from "../models/DokterModel.js";
import User from "../models/UserModel.js";
import Jadwal from "../models/JadwalModel.js";

// Tambah janji baru
export const createJanji = async (req, res) => {
    const { dokterId, userId, jadwalId, tanggal, status } = req.body;
    try {
        const janji = await Janji.create({
            dokterId,
            userId,
            jadwalId,
            tanggal,                   // simpan tanggal di sini
            status: status || "pending"
        });
        res.status(201).json(janji);
    } catch (error) {
        console.error("Error adding janji:", error.message);
        res.status(500).json({ message: "Gagal menambahkan janji", error: error.message });
    }
};

// Ambil semua janji
export const getAllJanji = async (req, res) => {
    try {
        const janji = await Janji.findAll({
            include: [
                {
                    model: User,
                    attributes: ['nama', 'no_tlp', 'foto']
                },
                {
                    model: Dokter,
                    attributes: ['nama', 'spesialis', 'foto']
                },
                {
                    model: Jadwal,
                    attributes: ['hari', 'waktu']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(janji);
    } catch (error) {
        console.error("Error getting all janji:", error.message);
        res.status(500).json({ message: "Gagal mengambil data janji", error: error.message });
    }
};

// Ambil janji berdasarkan ID
export const getJanjiById = async (req, res) => {
    try {
        const janji = await Janji.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: User,
                    attributes: ['nama', 'no_tlp', 'foto']
                },
                {
                    model: Dokter,
                    attributes: ['nama', 'spesialis', 'foto']
                },
                {
                    model: Jadwal,
                    attributes: ['hari', 'waktu']
                }
            ]
        });
        if (!janji) return res.status(404).json({ message: "Janji tidak ditemukan" });
        res.json(janji);
    } catch (error) {
        console.error("Error getting janji by ID:", error.message);
        res.status(500).json({ message: "Gagal mengambil data janji", error: error.message });
    }
};

// Update janji
export const updateJanji = async (req, res) => {
    const { dokterId, userId, jadwalId, tanggal, status } = req.body;
    try {
        const janji = await Janji.findByPk(req.params.id);
        if (!janji) return res.status(404).json({ message: "Janji tidak ditemukan" });

        // Update hanya field yang ada di request
        if (dokterId     !== undefined) janji.dokterId  = dokterId;
        if (userId       !== undefined) janji.userId    = userId;
        if (jadwalId     !== undefined) janji.jadwalId  = jadwalId;
        if (tanggal      !== undefined) janji.tanggal   = tanggal;   // update tanggal
        if (status       !== undefined) janji.status    = status;

        await janji.save();
        res.json(janji);
    } catch (error) {
        console.error("Error updating janji:", error.message);
        res.status(500).json({ message: "Gagal mengupdate janji", error: error.message });
    }
};

// Hapus janji
export const deleteJanji = async (req, res) => {
    try {
        const janji = await Janji.findByPk(req.params.id);
        if (!janji) return res.status(404).json({ message: "Janji tidak ditemukan" });

        await janji.destroy();
        res.json({ message: "Janji berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting janji:", error.message);
        res.status(500).json({ message: "Gagal menghapus janji", error: error.message });
    }
};