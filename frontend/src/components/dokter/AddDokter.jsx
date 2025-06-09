import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDokter = () => {
  const [nama, setNama] = useState("");
  const [gender, setGender] = useState("Laki-laki");
  const [spesialis, setSpesialis] = useState("");
  const [no_tlp, setNo_tlp] = useState("");
  const [foto, setFoto] = useState(null);

  const navigate = useNavigate();

  const loadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
    } else {
      setFoto(null);
    }
  };

  const addDokter = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("gender", gender);
    formData.append("spesialis", spesialis);
    formData.append("no_tlp", no_tlp);
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      await axios.post("http://localhost:5000/dokters", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin/dokter");
    } catch (error) {
      console.error("Error adding dokter:", error);
      alert("Gagal menambahkan dokter, cek console untuk detail.");
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={addDokter}>
          <div className="field">
            <label className="label">Nama Dokter</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Nama Dokter"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Spesialis</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Spesialis"
                value={spesialis}
                onChange={(e) => setSpesialis(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">No Telepon</label>
            <div className="control">
              <input
                type="tel"
                className="input"
                placeholder="No Telepon"
                value={no_tlp}
                onChange={(e) => setNo_tlp(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Foto</label>
            <div className="control">
              <input type="file" className="input" onChange={loadImage} />
            </div>
          </div>

          <div className="field">
            <button type="submit" className="button is-success">
              Tambah Dokter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDokter;
