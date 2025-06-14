import Users from "./models/UserModel.js";
import bcrypt from "bcrypt";

const seedAdmin = async () => {
  try {
    const adminEmail = "admin@klinik.com";

    const existingAdmin = await Users.findOne({ where: { email: adminEmail } });
    if (existingAdmin) {
      console.log("Admin default sudah ada.");
      return;
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash("admin123", salt);

    await Users.create({
      name: "Super Admin",
      email: adminEmail,
      password: hashPassword,
      gender: "Laki-laki",
      alamat: "Alamat Admin",
      no_tlp: "081234567890",
      role: "admin"
    });

    console.log("Admin default berhasil dibuat.");
  } catch (error) {
    console.error("Gagal membuat admin default:", error);
  }
};

export default seedAdmin;
