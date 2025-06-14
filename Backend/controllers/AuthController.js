import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register
export const registerUser = async (req, res) => {
  const {
    nama,
    email,
    password,
    gender = null,
    alamat = null,
    no_tlp = null,
    role = "user",
    foto = null
  } = req.body;

  try {
    // Validasi minimal field
    if (!nama || !email || !password) {
      return res.status(400).json({ msg: "Nama, email, dan password wajib diisi." });
    }

    // Cek apakah email sudah digunakan
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: "Email sudah digunakan." });
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // Simpan user baru
    await User.create({
      nama,
      email,
      password: hashPassword,
      gender,
      alamat,
      no_tlp,
      role,
      foto
    });

    res.status(201).json({ msg: "Registrasi berhasil." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal melakukan registrasi." });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan." });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "Password salah." });

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role
      },
      process.env.ACCESS_TOKEN_SECRET || "secretKey",
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Login berhasil",
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal login." });
  }
};

// Logout
export const logoutUser = async (req, res) => {
  return res.status(200).json({ msg: "Logout berhasil" });
};

// Me (verifikasi user)
export const me = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.userId },
      attributes: ['id', 'nama', 'email', 'role']
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan." });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal mengambil data user." });
  }
};
