import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const {DataTypes} = Sequelize

const User = db.define('users',{
    nama:DataTypes.STRING,
    email:DataTypes.STRING,
    password:DataTypes.STRING,
    gender:DataTypes.STRING,
    alamat:DataTypes.STRING,
    no_tlp:DataTypes.STRING
},{
    freezeTableName:true
});
export default User;

(async()=>{
    await db.sync();
})();