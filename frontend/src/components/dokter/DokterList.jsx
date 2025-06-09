import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";

const styles = {
  headerBg: "#1f2937", // dark navy
  headerText: "#ffffff",
  hoverRow: "#f9fafb", // soft gray
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
    if (!window.confirm("Yakin ingin menghapus Dokter ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/dokters/${id}`);
      getDokters(); // Refresh the list after deletion
    } catch (err) {
      console.error("Error deleting dokter:", err);
      alert("Gagal menghapus dokter. Silakan coba lagi.");
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-10">
        <h2 className="title is-4 has-text-centered">Daftar Dokter</h2>
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
                  <th>Gender</th>
                  <th>Spesialis</th>
                  <th>No. Telp</th>
                  <th>Foto</th>
                  <th className="has-text-centered">Aksi</th>
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
                    <td>{index + 1}</td>
                    <td>{user.nama}</td>
                    <td>
                      <span
                        className={`tag is-rounded ${user.gender === "Laki-laki" ? "is-link" : "is-warning"}`}
                      >
                        {user.gender}
                      </span>
                    </td>
                    <td>{user.spesialis}</td>
                    <td>{user.no_tlp || '-'}</td>
                    <td>
                      {user.foto ? (
                        <img
                          src={`http://localhost:5000/images/${user.foto}`}
                          alt="Foto Dokter"
                          width="50"
                          style={{ borderRadius: '5px' }}
                        />
                      ) : (
                        <span className="has-text-grey-light">-</span>
                      )}
                    </td>
                    <td className="has-text-centered">
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
                {dokters.length === 0 && (
                  <tr>
                    {/* colSpan disesuaikan dari 8 menjadi 7 karena satu kolom dihapus */}
                    <td colSpan="7" className="has-text-centered has-text-grey-light">
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
