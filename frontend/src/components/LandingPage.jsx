import React from 'react';

const LandingPage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar custom-navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <figure style={{ marginRight: '-13px', marginBottom: -8 }}>
              <img
                src="/logo2.png"
                alt="Klinik Sehat"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            </figure>
            <strong style={{ fontSize: '1.25rem' }}>Klinik Sehat</strong>
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            <a className="navbar-item" href="#about">Tentang Kami</a>
            <a className="navbar-item" href="#services">Layanan</a>
            <a className="navbar-item" href="#contact">Kontak</a>
            <a className="navbar-item" href="/profile">
              <figure className="image is-32x32" style={{ marginLeft: '8px' }}>
                <img
                  className="is-rounded"
                  src="./profile.jpg"
                  alt="Profile"
                />
              </figure>
            </a>
          </div>
        </div>
      </nav>



      {/* Hero Section */}
      <section className="hero is-info is-medium is-bold">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered is-variable is-8">
              {/* Kolom Teks */}
              <div className="column is-6">
                <h1 className="title is-2">Selamat Datang di Klinik Hafizh</h1>
                <p className="has-text-justified" >
                  Memberikan layanan kesehatan terbaik untuk Anda dan keluarga sejak 2010.
                  Dengan tim profesional dan fasilitas lengkap, kami siap membantu Anda.
                </p>
                <a href="#services" className="button is-light is-medium mt-4">
                  Lihat Layanan Kami
                </a>
              </div>

              {/* Kolom Gambar */}
              <div className="column is-6 has-text-centered">
                <figure className="image is-4by3">
                  <img
                    src="./dokter.png"
                    alt="Ilustrasi Dokter"
                    style={{ maxHeight: '300px', objectFit: 'contain' }}
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daftar Dokter */}
      <section id="dokter" className="section has-background-light">
        <h2 className="title has-text-centered mb-6">Daftar Dokter</h2>
        <div className="columns is-multiline is-centered">

          {/* Pemeriksaan Umum */}
          <div className="column is-one-third">
            <div className="box has-text-centered">
              <span className="icon is-large has-text-info mb-3">
              </span>
              <img src="./dokter.png" alt="1" style={{ width: '200px', height: 'auto' }} />
              <h3 className="subtitle is-5">Pemeriksaan Umum</h3>
              <p>Layanan kesehatan umum untuk semua usia.</p>
            </div>
          </div>

          {/* Vaksinasi */}
          <div className="column is-one-third">
            <div className="box has-text-centered">
              <span className="icon is-large has-text-success mb-3">
              </span>
              <img src="./dokter.png" alt="1" style={{ width: '200px', height: 'auto', alignItems: 'centered' }} />
              <h3 className="subtitle is-5">Vaksinasi</h3>
              <p>Tersedia berbagai jenis vaksin untuk anak dan dewasa.</p>
            </div>
          </div>

          {/* Laboratorium */}
          <div className="column is-one-third">
            <div className="box has-text-centered">
              <span className="icon is-large has-text-danger mb-3">
              </span>
              <img src="./dokter.png" alt="1" style={{ width: '200px', height: 'auto' }} />
              <h3 className="subtitle is-5">Laboratorium</h3>
              <p>Tes darah, urin, dan pemeriksaan lainnya.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Tentang Kami */}
      <section id="about" className="section">
        <div className="container">
          <div className="columns is-vcentered is-variable is-8">

            {/* Gambar */}
            <div className="column is-6 has-text-centered">
              <figure className="image is-4by3">
                <img
                  src="https://cdn.pixabay.com/photo/2020/06/17/11/09/doctor-5301226_960_720.png"
                  alt="Ilustrasi Klinik"
                  style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
              </figure>
            </div>

            {/* Teks */}
            <div className="column is-6">
              <h2 className="title is-3">Tentang Klinik Kami</h2>
              <p className="subtitle is-5">
                Klinik Sehat telah berdiri sejak 2010 dan berkomitmen untuk memberikan pelayanan kesehatan
                berkualitas. Dengan tenaga medis profesional dan fasilitas lengkap, kami siap membantu Anda
                dan keluarga menuju hidup yang lebih sehat.
              </p>
              <p>
                Kami melayani berbagai kebutuhan kesehatan mulai dari pemeriksaan umum, vaksinasi, hingga layanan
                laboratorium modern dengan standar tinggi.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* Layanan */}
      <section id="services" className="section has-background-light">
        <div className="container">
          <h2 className="title has-text-centered mb-6">Layanan Kami</h2>

          <div className="columns is-multiline is-centered">
            {/* Pemeriksaan Umum */}
            <div className="column is-one-third">
              <div className="box has-text-centered">
                <span className="icon is-large has-text-info mb-3">
                  <i className="fas fa-stethoscope fa-2x"></i>
                </span>
                <h3 className="subtitle is-5">Pemeriksaan Umum</h3>
                <p>Layanan kesehatan umum untuk semua usia.</p>
              </div>
            </div>

            {/* Vaksinasi */}
            <div className="column is-one-third">
              <div className="box has-text-centered">
                <span className="icon is-large has-text-success mb-3">
                  <i className="fas fa-syringe fa-2x"></i>
                </span>
                <h3 className="subtitle is-5">Vaksinasi</h3>
                <p>Tersedia berbagai jenis vaksin untuk anak dan dewasa.</p>
              </div>
            </div>

            {/* Laboratorium */}
            <div className="column is-one-third">
              <div className="box has-text-centered">
                <span className="icon is-large has-text-danger mb-3">
                  <i className="fas fa-vials fa-2x"></i>
                </span>
                <h3 className="subtitle is-5">Laboratorium</h3>
                <p>Tes darah, urin, dan pemeriksaan lainnya.</p>
              </div>
            </div>
          </div>

          {/* Tombol Reservasi */}
          <div className="has-text-centered mt-5">
            <a href="/login" className="button is-primary is-medium">
              Reservasi Online
            </a>
          </div>
        </div>
      </section>


      {/* Kontak */}
      <section id="contact" className="section">
        <div className="container has-text-centered">
          <h2 className="title">Hubungi Kami</h2>
          <p>📍 Alamat: Jl. Kesehatan No.10, Jakarta</p>
          <p>📞 Telepon: (021) 12345678</p>
          <p>📧 Email: info@kliniksehat.com</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer has-background-primary has-text-white has-text-centered">
        <div className="content">
          <p>&copy; 2025 Klinik Hafizh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
