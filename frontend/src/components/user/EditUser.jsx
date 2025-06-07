import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // opsional jika tidak ingin ubah password
  const [gender, setGender] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_tlp, setNo_tlp] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const getUserById = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${id}`);
      const data = res.data;
      setNama(data.nama);
      setEmail(data.email);
      setGender(data.gender);
      setAlamat(data.alamat);
      setNo_tlp(data.no_tlp);
    } catch (err) {
      console.error("Gagal mengambil data user:", err);
    }
  }, [id]);

  useEffect(() => {
    getUserById();
  }, [getUserById]);

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        nama,
        email,
        password: password || undefined, // kirim password hanya jika diisi
        gender,
        alamat,
        no_tlp,
      });
      navigate("/admin/user");
    } catch (error) {
      console.error("Gagal update user:", error.response || error.message || error);
      alert("Gagal memperbarui data user. Cek console untuk detail.");
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Nama</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Lengkap"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password (biarkan kosong jika tidak diubah)</label>
            <div className="control">
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password Baru"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="">Pilih Gender</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Alamat</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Alamat"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">No. Telepon</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={no_tlp}
                onChange={(e) => setNo_tlp(e.target.value)}
                placeholder="Nomor Telepon"
                required
              />
            </div>
          </div>

          <div className="field">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
