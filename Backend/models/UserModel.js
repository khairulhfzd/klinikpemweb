import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const {DataTypes} = Sequelize

const User = db.define('users',{
    nama:DataTypes.STRING,
    email:DataTypes.STRING,
    password:DataTypes.STRING,
    gender:DataTypes.STRING,
    alamat:DataTypes.STRING,
    no_tlp:DataTypes.STRING,
    role: {
        type: DataTypes.ENUM,
        values: ['admin', 'user'],
        defaultValue: 'user'
    },

    foto: {
        type: DataTypes.STRING, // Or DataTypes.BLOB if you plan to store binary data directly
        allowNull: true // This makes the column optional
    }
},{
    freezeTableName:true
});
export default User;

(async()=>{
    await db.sync();
})();