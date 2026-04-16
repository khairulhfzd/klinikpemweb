import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Wajib dipanggil agar Node.js bisa membaca file .env
dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql'
    }
);

export default db;
