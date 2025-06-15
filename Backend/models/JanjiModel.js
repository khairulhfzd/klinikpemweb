import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
import Dokter from "./DokterModel.js";
import Jadwal from "./JadwalModel.js"; // Import model Jadwal

const { DataTypes } = Sequelize;

const Janji = db.define("janji", {
    dokterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "dokters",
            key: "id"
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    jadwalId: { // Menambahkan kolom jadwalId untuk referensi ke tabel Jadwal
        type: DataTypes.INTEGER,
        allowNull: false, // Asumsi setiap janji harus memiliki jadwal
        references: {
            model: "jadwal", // Nama tabel yang direferensikan
            key: "id"
        }
    },

    tanggal: {
        type: DataTypes.DATEONLY, // Tambahkan ini
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: "pending"
    }
}, {
    freezeTableName: true,
    timestamps: true
});

Janji.belongsTo(User, { foreignKey: "userId" });
Janji.belongsTo(Dokter, { foreignKey: "dokterId" });
Janji.belongsTo(Jadwal, { foreignKey: "jadwalId" }); // Menambahkan asosiasi ke model Jadwal

export default Janji;