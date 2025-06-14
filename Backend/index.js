import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import seedAdmin from "./seedAdmin.js";

import UserRoute from "./routes/UserRoute.js";
import DokterRoute from "./routes/DokterRoute.js";
import JanjiRoute from "./routes/JanjiRoute.js";
import JadwalRoute from "./routes/JadwalRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static('public/images'));

app.use(UserRoute);
app.use(DokterRoute);
app.use(JanjiRoute);
app.use(JadwalRoute);
app.use("/auth", AuthRoute);

db.sync().then(async () => {
    console.log("Database connected...");
    await seedAdmin();
});

app.listen(5000, () => console.log('Server up and running on port 5000...'));
