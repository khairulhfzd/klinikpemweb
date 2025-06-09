import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditJanji = () => {
  const [users, setUsers] = useState([]);
  const [dokters, setDokters] = useState([]);
  const [jadwalList, setJadwalList] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedSpesialis, setSelectedSpesialis] = useState('');
  const [selectedDokterId, setSelectedDokterId] = useState('');
  const [selectedJadwalId, setSelectedJadwalId] = useState('');
  const [status, setStatus] = useState('pending');

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const [usersRes, doktersRes, jadwalRes, janjiRes] = await Promise.all([
        axios.get('http://localhost:5000/users'),
        axios.get('http://localhost:5000/dokters'),
        axios.get('http://localhost:5000/jadwal'),
        axios.get(`http://localhost:5000/janji/${id}`),
      ]);

      const janji = janjiRes.data;
      setUsers(usersRes.data);
      setDokters(doktersRes.data);
      setJadwalList(jadwalRes.data);
      setSelectedUser(janji.userId);
      setSelectedDokterId(janji.dokterId);
      setSelectedJadwalId(janji.jadwalId);
      setStatus(janji.status);

      // Auto-pilih spesialis berdasarkan dokter
      const selectedDokter = doktersRes.data.find(d => d.id === janji.dokterId);
      if (selectedDokter) {
        setSelectedSpesialis(selectedDokter.spesialis);
      }

    } catch (err) {
      console.error('Gagal memuat data:', err);
      alert('Gagal memuat data janji atau data lain.');
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/janji/${id}`, {
        userId: selectedUser,
        dokterId: selectedDokterId,
        jadwalId: selectedJadwalId,
        status,
      });
      alert("Janji berhasil diperbarui.");
      navigate("/admin/janji");
    } catch (err) {
      console.error("Gagal update janji:", err.response?.data || err.message);
      alert("Terjadi kesalahan saat mengupdate janji.");
    }
  };

  const selectedDokter = dokters.find(d => d.id === parseInt(selectedDokterId));

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '700px' }}>
        <div className="box">
          <h2 className="title has-text-centered has-text-link">Edit Janji Temu</h2>

          <form onSubmit={handleUpdate}>
            <div className="field">
              <label className="label">Nama Pengguna</label>
              <div className="select is-fullwidth is-info">
                <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
                  <option value="">Pilih Pengguna</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.nama} - {user.no_tlp}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label className="label">Spesialis</label>
              <div className="select is-fullwidth is-info">
                <select
                  value={selectedSpesialis}
                  onChange={(e) => {
                    setSelectedSpesialis(e.target.value);
                    setSelectedDokterId('');
                    setSelectedJadwalId('');
                  }}
                  required
                >
                  <option value="">Pilih Spesialis</option>
                  {[...new Set(dokters.map(d => d.spesialis))].map((sp, idx) => (
                    <option key={idx} value={sp}>{sp}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label className="label">Dokter</label>
              <div className="select is-fullwidth is-info">
                <select value={selectedDokterId} onChange={(e) => setSelectedDokterId(e.target.value)} required>
                  <option value="">Pilih Dokter</option>
                  {dokters.filter(d => d.spesialis === selectedSpesialis).map(dokter => (
                    <option key={dokter.id} value={dokter.id}>{dokter.nama}</option>
                  ))}
                </select>
              </div>
            </div>

            {selectedDokter?.foto && (
              <div className="field has-text-centered">
                <figure className="image is-128x128 is-inline-block mt-2">
                  <img className="is-rounded" src={`http://localhost:5000/images/${selectedDokter.foto}`} alt={selectedDokter.nama} />
                </figure>
                <p className="has-text-weight-semibold mt-2">{selectedDokter.nama}</p>
              </div>
            )}

            <div className="field">
              <label className="label">Jadwal</label>
              <div className="select is-fullwidth is-info">
                <select value={selectedJadwalId} onChange={(e) => setSelectedJadwalId(e.target.value)} required>
                  <option value="">Pilih Jadwal</option>
                  {jadwalList.map(j => (
                    <option key={j.id} value={j.id}>{j.hari} - {j.waktu}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label className="label">Status</label>
              <div className="select is-fullwidth">
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="field has-text-centered mt-5">
              <button className="button is-success is-medium" type="submit">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditJanji;
