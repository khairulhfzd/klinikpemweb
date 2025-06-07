import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReservasiPage = () => {
  const navigate = useNavigate();

  const [spesialis, setSpesialis] = useState('');
  const [dokter, setDokter] = useState('');
  const [dataDokter] = useState([
    {
      nama: 'dr. Andi Wijaya',
      spesialis: 'Umum',
      foto: '/dokter/andi.jpg',
    },
    {
      nama: 'drg. Sari Lestari',
      spesialis: 'Gigi',
      foto: '/dokter/sari.jpg',
    },
    {
      nama: 'dr. Budi Santoso, SpOG',
      spesialis: 'Kandungan',
      foto: '/dokter/budi.jpg',
    },
    {
      nama: 'dr. Rina Mulyani, SpA',
      spesialis: 'Anak',
      foto: '/dokter/rina.jpg',
    },
  ]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Reservasi berhasil dikirim!');
    e.target.reset();
    setSpesialis('');
    setDokter('');
  };

  // Filter dokter berdasarkan spesialis
  const dokterTersedia = dataDokter.filter((d) => d.spesialis === spesialis);
  const selectedDokter = dataDokter.find((d) => d.nama === dokter);

  return (
    <section
      className="hero is-fullheight"
      style={{
        background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
        paddingTop: '3rem',
      }}
    >
      <div className="container" style={{ maxWidth: '700px' }}>
        <div className="box" style={{ borderRadius: '12px' }}>
          <h2 className="title has-text-centered has-text-link mb-5">
            Formulir Reservasi
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Nama Lengkap</label>
              <div className="control">
                <input className="input is-info" type="text" required />
              </div>
            </div>

            <div className="field">
              <label className="label">No. Telepon</label>
              <div className="control">
                <input className="input is-info" type="tel" required />
              </div>
            </div>

            <div className="field">
              <label className="label">Tanggal Reservasi</label>
              <div className="control">
                <input className="input is-info" type="date" required />
              </div>
            </div>

            <div className="field">
              <label className="label">Jenis Layanan</label>
              <div className="control">
                <div className="select is-fullwidth is-info">
                  <select required>
                    <option value="">Pilih Layanan</option>
                    <option>Pemeriksaan Umum</option>
                    <option>Vaksinasi</option>
                    <option>Laboratorium</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Spesialis */}
            <div className="field">
              <label className="label">Spesialis</label>
              <div className="control">
                <div className="select is-fullwidth is-info">
                  <select
                    value={spesialis}
                    onChange={(e) => {
                      setSpesialis(e.target.value);
                      setDokter('');
                    }}
                    required
                  >
                    <option value="">Pilih Spesialis</option>
                    <option value="Umum">Umum</option>
                    <option value="Gigi">Gigi</option>
                    <option value="Kandungan">Kandungan</option>
                    <option value="Anak">Anak</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dokter */}
            {spesialis && (
              <div className="field">
                <label className="label">Dokter</label>
                <div className="control">
                  <div className="select is-fullwidth is-info">
                    <select
                      value={dokter}
                      onChange={(e) => setDokter(e.target.value)}
                      required
                    >
                      <option value="">Pilih Dokter</option>
                      {dokterTersedia.map((d) => (
                        <option key={d.nama} value={d.nama}>
                          {d.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Foto Dokter */}
            {selectedDokter && (
              <div className="field has-text-centered">
                <figure className="image is-128x128 is-inline-block mt-2">
                  <img
                    className="is-rounded"
                    src={selectedDokter.foto}
                    alt={selectedDokter.nama}
                    style={{ objectFit: 'cover' }}
                  />
                </figure>
                <p className="has-text-weight-semibold mt-2">{selectedDokter.nama}</p>
              </div>
            )}

            {/* Jadwal */}
            <div className="field">
              <label className="label">Jadwal</label>
              <div className="control">
                <div className="select is-fullwidth is-info">
                  <select required>
                    <option value="">Pilih Jadwal</option>
                    <option>08.00 - 09.00</option>
                    <option>09.00 - 10.00</option>
                    <option>10.00 - 11.00</option>
                    <option>13.00 - 14.00</option>
                    <option>14.00 - 15.00</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
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

export default ReservasiPage;
