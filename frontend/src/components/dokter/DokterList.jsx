import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";

const styles = {
  headerBg: "#1f2937",        // dark navy
  headerText: "#ffffff",
  hoverRow: "#f9fafb",        // soft gray
  tableBox: {
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
    backgroundColor: "#fff",
  },
};

const DokterList = () => {
  const [dokters, setDokters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDokters();
  }, []);

  const getDokters = async () => {
    try {
      const res = await axios.get("http://localhost:5000/dokters");
      setDokters(res.data);
    } catch (err) {
      console.error("Error fetching dokters:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteDokter = async (id) => {
    // Menggunakan custom modal atau alert untuk konfirmasi penghapusan.
    // Jika Anda menggunakan window.confirm, ingat ini akan memblokir UI.
    if (!window.confirm("Yakin ingin menghapus Dokter ini?")) return; 
    try {
      await axios.delete(`http://localhost:5000/dokters/${id}`);
      getDokters(); // Refresh daftar dokter setelah penghapusan
    } catch (err) {
      console.error("Error deleting dokter:", err);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-10">
        <Link to="/admin/dokter/add" className="button is-success mb-4">
          <FaPlus className="mr-2" /> Tambah
        </Link>

        {loading ? (
          <progress className="progress is-small is-primary" max="100">
            Loading...
          </progress>
        ) : (
          <div style={styles.tableBox}>
            <table className="table is-fullwidth is-hoverable">
              <thead>
                <tr style={{ backgroundColor: styles.headerBg, color: styles.headerText }}>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Gender</th> {/* Header untuk kolom Gender */}
                  <th>Spesialis</th>
                  <th>Foto</th>
                  <th className="has-text-centered">Aksi</th> {/* Header untuk kolom Aksi */}
                </tr>
              </thead>
              <tbody>
                {dokters.map((user, index) => (
                  <tr
                    key={user.id}
                    style={{ cursor: "default", transition: "background 0.2s" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = styles.hoverRow)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "")
                    }
                  >
                    <td>{index + 1}</td> {/* Kolom No */}
                    <td>{user.nama}</td> {/* Kolom Nama */}
                    
                    {/* HANYA SATU KOLOM UNTUK GENDER - MENGGUNAKAN TAG GENDER */}
                    <td> 
                      <span
                        className={`tag is-rounded ${user.gender === "Laki-laki" ? "is-link" : "is-warning"}`}
                      >
                        {user.gender}
                      </span>
                    </td> 
                    
                    <td>{user.spesialis}</td> {/* Kolom Spesialis */}
                    <td> {/* Kolom Foto */}
                      {user.foto ? (
                        // PERBAIKAN DI SINI: user.foto kini diasumsikan hanya nama file unik
                        // dan folder server untuk gambar adalah /images/
                        <img 
                          src={`http://localhost:5000/images/${user.foto}`} // Path yang diperbarui
                          alt="Foto Dokter" 
                          width="50" 
                          style={{ borderRadius: '5px' }} // Sedikit styling untuk gambar
                        />
                      ) : (
                        <span className="has-text-grey-light">-</span>
                      )}
                    </td>
                    <td className="has-text-centered"> {/* Kolom Aksi */}
                      <Link
                        to={`/admin/dokter/edit/${user.id}`}
                        className="button is-small is-info mr-2"
                        title="Edit"
                      >
                        <FaEdit size={14} />
                      </Link>
                      <button
                        onClick={() => deleteDokter(user.id)}
                        className="button is-small is-danger"
                        title="Hapus"
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {/* Tampilkan pesan jika tidak ada data */}
                {dokters.length === 0 && (
                  <tr>
                    <td colSpan="6" className="has-text-centered has-text-grey-light"> {/* colSpan disesuaikan */}
                      Tidak ada data Dokter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DokterList;
