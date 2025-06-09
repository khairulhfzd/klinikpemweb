import db from './config/Database.js';
import Jadwal from './models/JadwalModel.js';

const seedDatabase = async () => {
    try {
        await db.sync(); // Tidak pakai force
        console.log('Sinkronisasi tabel selesai (tanpa menghapus).');

        const initialJadwalData = [
            { hari: 'Senin', waktu: '08:00 - 11:00' },
            { hari: 'Senin', waktu: '13:00 - 16:00' },
            { hari: 'Selasa', waktu: '08:00 - 11:00' },
            { hari: 'Selasa', waktu: '13:00 - 16:00' },
            { hari: 'Rabu', waktu: '08:00 - 11:00' },
            { hari: 'Rabu', waktu: '13:00 - 16:00' },
            { hari: 'Kamis', waktu: '08:00 - 11:00' },
            { hari: 'Kamis', waktu: '13:00 - 16:00' },
            { hari: 'Jumat', waktu: '08:00 - 11:00' },
            { hari: 'Jumat', waktu: '14:00 - 17:00' },
        ];

        const count = await Jadwal.count();
        if (count === 0) {
            await Jadwal.bulkCreate(initialJadwalData);
            console.log('Data jadwal awal berhasil ditambahkan!');
        } else {
            console.log('Data jadwal sudah ada, tidak perlu seeding ulang.');
        }
    } catch (error) {
        console.error('Gagal seeding database:', error);
    } finally {
        await db.close();
    }
};

seedDatabase();
