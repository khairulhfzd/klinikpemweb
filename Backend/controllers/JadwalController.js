import Jadwal from "../models/JadwalModel.js"; // Import model Jadwal yang baru dibuat

// GET semua jadwal
export const getJadwal = async (req, res) => {
    try {
        const response = await Jadwal.findAll({
            attributes: ['id', 'hari', 'waktu'] // Hanya mengambil kolom yang relevan
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Gagal mengambil data jadwal" });
    }
};

// GET jadwal berdasarkan ID
export const getJadwalById = async (req, res) => {
    try {
        const response = await Jadwal.findOne({
            attributes: ['id', 'hari', 'waktu'], // Hanya mengambil kolom yang relevan
            where: { id: req.params.id }
        });
        if (!response) {
            return res.status(404).json({ msg: "Jadwal tidak ditemukan" });
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Gagal mengambil data jadwal" });
    }
};

// Tidak ada fungsi POST, PUT, DELETE di sini karena Anda menyebutkan
// "ga harus inputkan lagi dengan datanya", mengindikasikan data sudah predefined.
// Jika di masa depan Anda perlu mengelola jadwal melalui API, Anda bisa menambahkannya di sini.
