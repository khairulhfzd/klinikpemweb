import User from "../models/UserModel.js";

// GET semua user
export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Gagal mengambil data user" });
  }
};

// GET user berdasarkan ID
export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: { id: req.params.id },
    });
    if (!response) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Gagal mengambil data user" });
  }
};

// POST user baru (dengan upload foto)
export const createUser = async (req, res) => {
  const { nama, email, password, gender, alamat, no_tlp } = req.body;
  const foto = req.file ? req.file.filename : null;

  try {
    await User.create({
      nama,
      email,
      password,
      gender,
      alamat,
      no_tlp,
      foto,
    });
    res.status(201).json({ msg: "User berhasil dibuat" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Gagal membuat user" });
  }
};

// PUT update user (dengan update foto jika dikirim)
export const updateUser = async (req, res) => {
  const { nama, email, password, gender, alamat, no_tlp } = req.body;

  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  let foto = user.foto;
  if (req.file) {
    foto = req.file.filename;
    // TODO: Hapus file lama jika perlu
  }

  try {
    await User.update(
      {
        nama,
        email,
        password,
        gender,
        alamat,
        no_tlp,
        foto,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ msg: "User berhasil diperbarui" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Gagal memperbarui user" });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ msg: "User berhasil dihapus" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Gagal menghapus user" });
  }
};
