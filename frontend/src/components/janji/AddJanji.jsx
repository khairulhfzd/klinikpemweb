import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddJanji = () => {
  const [users, setUsers] = useState([]);
  const [dokters, setDokters] = useState([]);
  const [jadwalList, setJadwalList] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedSpesialis, setSelectedSpesialis] = useState('');
  const [selectedDokterId, setSelectedDokterId] = useState('');
  const [selectedJadwalId, setSelectedJadwalId] = useState('');
  const [selectedTanggal, setSelectedTanggal] = useState(''); // NEW STATE FOR DATE
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserPhoto, setSelectedUserPhoto] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [usersRes, doktersRes, jadwalRes] = await Promise.all([
          axios.get('http://localhost:5000/users'),
          axios.get('http://localhost:5000/dokters'),
          axios.get('http://localhost:5000/jadwal'),
        ]);

        setUsers(usersRes.data);
        setDokters(doktersRes.data);
        setJadwalList(jadwalRes.data);
      } catch (err) {
        console.error('Gagal mengambil data:', err);
        setError("Gagal memuat data. Pastikan server backend berjalan dan data tersedia.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update selectedUserPhoto and selectedUserName when selectedUser changes
  useEffect(() => {
    const user = users.find(u => u.id === parseInt(selectedUser));
    if (user) {
      const photoUrl = user.foto ? `http ://localhost:5000/images/${user.foto}` : '';
        setSelectedUserPhoto(photoUrl);
      setSelectedUserName(user.nama);
    } else {
      setSelectedUserPhoto('');
      setSelectedUserName('');
    }
  }, [selectedUser, users]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser || !selectedDokterId || !selectedJadwalId || !selectedTanggal) { // Added selectedTanggal
      alert("Mohon lengkapi semua pilihan (Pengguna, Dokter, Jadwal, Tanggal) sebelum submit.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/janji', {
        userId: selectedUser,
        dokterId: selectedDokterId,
        jadwalId: selectedJadwalId,
        tanggal: selectedTanggal, // NEW: Include selectedTanggal
        status: 'pending',
      });

      alert('Reservasi berhasil dikirim!');
      navigate('/admin/janji'); // Kembali ke halaman list janji

    } catch (err) {
      console.error('Gagal mengirim reservasi:', err.response?.data || err.message || err);
      alert('Gagal mengirim reservasi. Silakan coba lagi.');
    }
  };

  const selectedDokter = dokters.find(d => d.id === parseInt(selectedDokterId));

  if (loading) {
    return (
      <section className="hero is-fullheight is-info is-bold">
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title">Memuat data...</p>
            <progress className="progress is-small is-primary" max="100"></progress>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="hero is-fullheight is-danger is-bold">
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title">Terjadi Kesalahan</p>
            <p className="subtitle">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero is-fullheight" style={{ background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)', paddingTop: '3rem' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <div className="box" style={{ borderRadius: '12px' }}>
          <h2 className="title has-text-centered has-text-link mb-5">Formulir Reservasi</h2>

          <form onSubmit={handleSubmit}>
            {/* User */}
            <div className="field">
              <label className="label">Nama Pengguna</label>
              <div className="select is-fullwidth is-info">
                <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
                  <option value="">Pilih Nama</option>
                  {users.length === 0 ? (
                    <option disabled>Tidak ada data pengguna</option>
                  ) : (
                    users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.nama} - {user.no_tlp}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Foto Pengguna yang Dipilih (Tampilan di luar dropdown) */}
            {selectedUserPhoto && (
              <div className="field has-text-centered mb-4">
                <figure className="image is-96x96 is-inline-block mt-2">
                  <img
                    className="is-rounded"
                    src={selectedUserPhoto}
                    alt={selectedUserName || "User Avatar"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      console.log('Error loading user photo:', selectedUserPhoto);
                    }}
                  />
                </figure>
                {!selectedUserPhoto && selectedUserName && (
                  <div style={styles.avatarPlaceholder}>
                    {selectedUserName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            )}

            {/* Spesialis */}
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
                  {dokters.length === 0 ? (
                    <option disabled>Tidak ada data spesialis</option>
                  ) : (
                    [...new Set(dokters.map((d) => d.spesialis))].map((sp, index) => (
                      <option key={index} value={sp}>{sp}</option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Dokter */}
            {selectedSpesialis && (
              <div className="field">
                <label className="label">Dokter</label>
                <div className="select is-fullwidth is-info">
                  <select
                    value={selectedDokterId}
                    onChange={(e) => {
                      setSelectedDokterId(e.target.value);
                      setSelectedJadwalId('');
                    }}
                    required
                  >
                    <option value="">Pilih Dokter</option>
                    {dokters.filter((d) => d.spesialis === selectedSpesialis).length === 0 ? (
                      <option disabled>Tidak ada dokter untuk spesialis ini</option>
                    ) : (
                      dokters
                        .filter((d) => d.spesialis === selectedSpesialis)
                        .map((dokter) => (
                          <option key={dokter.id} value={dokter.id}>
                            {dokter.nama}
                          </option>
                        ))
                    )}
                  </select>
                </div>
              </div>
            )}

            {/* Foto Dokter */}
            {selectedDokter && selectedDokter.foto && (
              <div className="field has-text-centered">
                <figure className="image is-128x128 is-inline-block mt-2">
                  <img
                    className="is-rounded"
                    src={`http://localhost:5000/images/${selectedDokter.foto}`}
                  alt={selectedDokter.nama}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'placeholder_image_url_if_any.jpg';
                    console.log('Error loading doctor photo:', `http://localhost:5000/images/${selectedDokter.foto}`);
                    }}/>
                </figure>
              </div>
            )}

            {/* Jadwal */}
            <div className="field">
              <label className="label">Jadwal</label>
              <div className="select is-fullwidth is-info">
                <select value={selectedJadwalId} onChange={(e) => setSelectedJadwalId(e.target.value)} required>
                  <option value="">Pilih Jadwal</option>
                  {jadwalList.length === 0 ? (
                    <option disabled>Tidak ada data jadwal</option>
                  ) : (
                    jadwalList.map((jadwalItem) => (
                      <option key={jadwalItem.id} value={jadwalItem.id}>
                        {jadwalItem.hari} - {jadwalItem.waktu}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* NEW: Tanggal */}
            <div className="field">
              <label className="label">Tanggal Janji Temu</label>
              <div className="control">
                <input
                  className="input is-info"
                  type="date"
                  value={selectedTanggal}
                  onChange={(e) => setSelectedTanggal(e.target.value)}
                  min={new Date().toISOString().split('T')[0]} // Optional: set min date to today
                  required
                />
              </div>
            </div>

            <div className="field has-text-centered mt-5">
              <button className="button is-link is-medium" type="submit">
                Kirim Reservasi
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

// Tambahkan gaya untuk placeholder avatar jika diperlukan
const styles = {
  avatarPlaceholder: {
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    backgroundColor: '#D1C4E9',
    color: '#5E35B1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '2em',
    margin: '10px auto',
  },
};

export default AddJanji;