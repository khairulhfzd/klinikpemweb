import { Sequelize } from 'sequelize';
import db from '../config/Database.js'; // Asumsikan Anda memiliki konfigurasi database di sini

const { DataTypes } = Sequelize;

// Definisikan model 'jadwal'
const Jadwal = db.define('jadwal', {
    // ID akan dibuat otomatis oleh Sequelize jika tidak didefinisikan secara eksplisit
    // dan jika ini adalah primary key
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    hari: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    waktu: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true // Menjaga nama tabel sesuai definisi ('jadwal' bukan 'jadwals')
});

export default Jadwal;