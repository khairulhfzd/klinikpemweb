import { Sequelize } from "sequelize";

const db = new Sequelize('klinik', 'root', 'oop', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;
