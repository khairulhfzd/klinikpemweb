import multer from "multer";
import path from "path";

// Set folder penyimpanan
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images"); // buat folder ini jika belum ada
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
