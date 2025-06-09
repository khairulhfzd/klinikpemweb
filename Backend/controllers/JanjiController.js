// controllers/JanjiController.js
import Janji from "../models/JanjiModel.js";
import Dokter from "../models/DokterModel.js";
import User from "../models/UserModel.js";
import Jadwal from "../models/JadwalModel.js"; // Import model Jadwal

// Tambah janji baru
export const createJanji = async (req, res) => {
    // Menambahkan jadwalId dari body request
    const { dokterId, userId, jadwalId, status } = req.body;
    try {
        const janji = await Janji.create({
            dokterId,
            userId,
            jadwalId, // Menyimpan jadwalId
            status: status || "pending"
        });
        res.status(201).json(janji);
    } catch (error) {
        console.error("Error adding janji:", error.message); // Logging error lebih detail
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
                    attributes: ['nama', 'no_tlp']
                },
                {
                    model: Dokter,
                    // Menghapus 'jadwal' dari attributes Dokter karena sudah dipindah ke model Jadwal
                    attributes: ['nama', 'spesialis', 'foto']
                },
                {
                    model: Jadwal, // Include model Jadwal
                    attributes: ['hari', 'waktu'] // Ambil hari dan waktu dari Jadwal
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(janji);
    } catch (error) {
        console.error("Error getting all janji:", error.message); // Logging error lebih detail
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
                    attributes: ['nama', 'no_tlp']
                },
                {
                    model: Dokter,
                    // Menghapus 'jadwal' dari attributes Dokter karena sudah dipindah ke model Jadwal
                    attributes: ['nama', 'spesialis', 'foto']
                },
                {
                    model: Jadwal, // Include model Jadwal
                    attributes: ['hari', 'waktu'] // Ambil hari dan waktu dari Jadwal
                }
            ]
        });
        if (!janji) return res.status(404).json({ message: "Janji tidak ditemukan" });
        res.json(janji);
    } catch (error) {
        console.error("Error getting janji by ID:", error.message); // Logging error lebih detail
        res.status(500).json({ message: "Gagal mengambil data janji", error: error.message });
    }
};

// Update janji (menambahkan jadwalId agar bisa diupdate juga jika diperlukan)
export const updateJanji = async (req, res) => {
    const { status, jadwalId, dokterId, userId } = req.body; // Menambahkan jadwalId
    try {
        const janji = await Janji.findByPk(req.params.id);
        if (!janji) return res.status(404).json({ message: "Janji tidak ditemukan" });

        // Update bidang yang diberikan, termasuk jadwalId
        janji.status = status !== undefined ? status : janji.status;
        janji.jadwalId = jadwalId !== undefined ? jadwalId : janji.jadwalId;
        janji.dokterId = dokterId !== undefined ? dokterId : janji.dokterId;
        janji.userId = userId !== undefined ? userId : janji.userId;

        await janji.save();
        res.json(janji);
    } catch (error) {
        console.error("Error updating janji:", error.message); // Logging error lebih detail
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
        console.error("Error deleting janji:", error.message); // Logging error lebih detail
        res.status(500).json({ message: "Gagal menghapus janji", error: error.message });
    }
};
