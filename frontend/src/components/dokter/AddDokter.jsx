import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDokter = () => {
  // States untuk menyimpan data input teks
  const [nama, setNama] = useState("");
  const [gender, setGender] = useState("");
  const [spesialis, setSpesialis] = useState("");
  
  // State untuk file foto dan preview tetap ada untuk UI
  const [foto, setFoto] = useState(null); 
  const [preview, setPreview] = useState(""); 
  
  const navigate = useNavigate();

  // Fungsi loadImage tetap ada untuk menampilkan preview
  const loadImage = (e) => {
    const file = e.target.files[0];
    if (file) { // Pastikan file ada sebelum membuat URL
      setFoto(file);
      setPreview(URL.createObjectURL(file)); 
    } else {
      setFoto(null);
      setPreview("");
    }
  };

  // Fungsi untuk menyimpan data dokter
  const saveDokter = async (e) => {
    e.preventDefault(); 
    
    // Gunakan FormData untuk mengirim data teks.
    // Ini konsisten dengan setup backend yang mungkin masih mengharapkan FormData.
    const formData = new FormData(); 
    formData.append('nama', nama);
    formData.append('gender', gender);
    formData.append('spesialis', spesialis);
    
    // BARIS INI KINI DIAKTIFKAN: Foto DIKIRIMKAN ke FormData.
    formData.append('foto', foto); 

    try {
      // Kirim data ke backend
      await axios.post('http://localhost:5000/dokters', formData, {
        headers: {
          // Tetap gunakan Content-Type multipart/form-data karena FormData masih digunakan
          'Content-Type': 'multipart/form-data', 
        },
      });
      // Arahkan ke daftar dokters setelah berhasil
      navigate("/admin/dokter"); 
    } catch (error) {
      console.error("Gagal menyimpan dokter:", error.response || error.message || error);
      let errorMessage = "Terjadi kesalahan.";
      if (error.response && error.response.data && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      } else if (error.message) {
        errorMessage = error.message;
      }
      alert(`Gagal menyimpan data: ${errorMessage}. Cek console untuk detail.`);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveDokter}>
          {/* Input Nama Dokter */}
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

          {/* Input Gender */}
          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required 
                >
                  <option value="">Pilih Gender</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Input Spesialis */}
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
          
          {/* Bagian untuk input Foto dan preview TETAP ADA di UI */}
          <div className="field">
            <label className="label">Foto</label>
            <div className="control">
              <input 
                type="file" 
                className="input" 
                onChange={loadImage} 
              />
            </div>
          </div>

          {preview && ( 
            <div className="field">
              <figure className="image is-128x128">
                <img src={preview} alt="Preview Gambar" />
              </figure>
            </div>
          )} 
          

          {/* Tombol Save */}
          <div className="field">
            <button type="submit" className="button is-success">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDokter;
