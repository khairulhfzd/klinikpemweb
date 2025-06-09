import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";

const JanjiList = () => {
  const [janji, setJanji] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJanji();
  }, []);

  const fetchJanji = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/janji");
      setJanji(res.data);
    } catch (err) {
      console.error("Error fetching janji:", err);
      alert("Gagal memuat data janji.");
    } finally {
      setLoading(false);
    }
  };

  const deleteJanji = async (id) => {
    if (!window.confirm("Yakin ingin menghapus janji ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/janji/${id}`);
      fetchJanji();
    } catch (err) {
      console.error("Error deleting janji:", err);
      alert("Gagal menghapus janji.");
    }
  };

  // Fungsi update status janji
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/janji/${id}`, { status: newStatus });
      fetchJanji(); // refresh data setelah update
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Gagal mengupdate status janji.");
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-11">
        <h2 className="title is-4 has-text-centered">Daftar Janji Temu</h2>
        <Link to="./add" className="button is-primary is-rounded mb-4">
          <FaPlus className="mr-2" /> Tambah Janji Temu
        </Link>

        {loading ? (
          <progress className="progress is-small is-info" max="100">
            Loading...
          </progress>
        ) : (
          <div className="box" style={{ borderRadius: "12px", boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)" }}>
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead>
                <tr className="has-background-dark has-text-white">
                  <th>No</th>
                  <th>Nama Pasien</th>
                  <th>No. Telepon</th>
                  <th>Spesialis</th>
                  <th>Nama Dokter</th>
                  <th>Jadwal</th>
                  <th>Status</th>
                  <th>Dibuat</th>
                  <th>Diperbarui</th>
                  <th className="has-text-centered">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {janji.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="has-text-centered has-text-grey-light">
                      Tidak ada data Janji Temu.
                    </td>
                  </tr>
                ) : (
                  janji.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.user?.nama || 'N/A'}</td>
                      <td>{item.user?.no_tlp || 'N/A'}</td>
                      <td>{item.dokter?.spesialis || 'N/A'}</td>
                      <td>{item.dokter?.nama || 'N/A'}</td>
                      <td>{item.jadwal ? `${item.jadwal.hari} ( ${item.jadwal.waktu} )` : 'N/A'}</td>
                      <td>
                        <div className="select is-small is-rounded">
                          <select
                            value={item.status}
                            onChange={(e) => updateStatus(item.id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      </td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                      <td className="has-text-centered">
                        <Link
                          to={`/admin/janji/edit/${item.id}`}
                          className="button is-small is-info is-rounded mr-2"
                          title="Edit"
                        >
                          <FaEdit size={14} />
                        </Link>
                        <button
                          onClick={() => deleteJanji(item.id)}
                          className="button is-small is-danger is-rounded"
                          title="Hapus"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JanjiList;
