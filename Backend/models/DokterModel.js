import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const Dokter = db.define('dokters', {
    nama: DataTypes.STRING,
    gender: DataTypes.STRING,
    spesialis: DataTypes.STRING,
    no_tlp: DataTypes.STRING,
    foto: DataTypes.STRING
}, {
    freezeTableName: true
});

export default Dokter;

(async () => {
    await db.sync(); // Sinkronisasi dengan database
})();
