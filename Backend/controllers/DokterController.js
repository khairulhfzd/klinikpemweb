import Dokter from "../models/DokterModel.js";

export const getDokters = async(req, res) => {
    try {
        const response = await Dokter.findAll();
        res.status(200).json(response);
    } catch (error){
        console.log(error.message);
    } 
}

export const getDokterById = async(req, res) => {
    try {
        const response = await Dokter.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error){
        console.log(error.message);
    } 
}

export const createDokter = async (req, res) => {
  const { nama, gender, spesialis } = req.body;
  const foto = req.file ? req.file.filename : null;

  try {
    await Dokter.create({ nama, gender, spesialis, foto });
    res.status(201).json({ msg: "Dokter created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Gagal membuat dokter" });
  }
};


export const updateDokter = async (req, res) => {
  const { nama, gender, spesialis } = req.body;
  let foto;

  // Cari data dokter lama
  const dokter = await Dokter.findOne({ where: { id: req.params.id } });
  if (!dokter) return res.status(404).json({ msg: "Dokter tidak ditemukan" });

  // Cek apakah user upload file baru
  if (req.file) {
    foto = req.file.filename;
    // TODO: Optional: hapus file lama dari filesystem kalau perlu
  } else {
    foto = dokter.foto; // kalau tidak ada file baru, pakai foto lama
  }

  try {
    await Dokter.update(
      { nama, gender, spesialis, foto },
      {
        where: { id: req.params.id }
      }
    );
    res.status(200).json({ msg: "Dokter updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Gagal mengupdate dokter" });
  }
};

export const deleteDokter = async(req, res) =>{
    try {
        await Dokter.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Dokter deleted"});
    } catch (error){
        console.log(error.message);
    }
}

