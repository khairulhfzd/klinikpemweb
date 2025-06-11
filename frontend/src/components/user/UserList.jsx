import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrashAlt, FaEye, FaEyeSlash } from "react-icons/fa";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordMap, setShowPasswordMap] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Yakin ingin menghapus Pasien ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-11">
        <h2 className="title is-4 has-text-centered">Daftar Users</h2>
        <Link to="./add" className="button is-primary is-rounded mb-4">
          <FaPlus className="mr-2" /> Tambah Pasien
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
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Gender</th>
                  <th>Alamat</th>
                  <th>No Telp</th>
                  <th>Foto</th> {/* Kolom foto ditambahkan */}
                  <th className="has-text-centered">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="animate__animated animate__fadeIn">
                    <td>{index + 1}</td>
                    <td>{user.nama}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="is-flex is-align-items-center">
                        <input
                          type={showPasswordMap[user.id] ? "text" : "password"}
                          className="input is-small"
                          value={user.password}
                          readOnly
                          style={{ width: "120px", marginRight: "5px" }}
                        />
                        <span
                          onClick={() =>
                            setShowPasswordMap((prev) => ({
                              ...prev,
                              [user.id]: !prev[user.id],
                            }))
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {showPasswordMap[user.id] ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`tag is-rounded is-medium ${
                          user.gender === "Laki-laki" ? "is-link" : "is-warning"
                        }`}
                      >
                        {user.gender}
                      </span>
                    </td>
                    <td>{user.alamat}</td>
                    <td>{user.no_tlp}</td>
                    <td>
                      {user.foto ? (
                        <img
                          src={`http://localhost:5000/images/${user.foto}`}
                          alt="Foto User"
                          width="50"
                          style={{ borderRadius: "5px" }}
                        />
                      ) : (
                        <span className="has-text-grey-light">-</span>
                      )}
                    </td>
                    <td className="has-text-centered">
                      <Link
                        to={`/admin/user/edit/${user.id}`}
                        className="button is-small is-info is-rounded mr-2"
                        title="Edit"
                      >
                        <FaEdit size={14} />
                      </Link>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="button is-small is-danger is-rounded"
                        title="Hapus"
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="9" className="has-text-centered has-text-grey-light">
                      Tidak ada data Pasien.
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

export default UserList;
