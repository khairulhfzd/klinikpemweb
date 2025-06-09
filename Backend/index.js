import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import DokterRoute from "./routes/DokterRoute.js";
import JanjiRoute from "./routes/JanjiRoute.js";
import JadwalRoute from "./routes/JadwalRoute.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(DokterRoute);
app.use(JanjiRoute);
app.use(JadwalRoute);
app.use('/images', express.static('public/images'));

app.listen(5000, () => console.log('server up and running...'));
