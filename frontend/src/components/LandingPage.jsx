import React, { useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {/* Navbar */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
        className="navbar custom-navbar animate__animated animate__fadeInDown"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <figure style={{ marginRight: '-13px', marginBottom: -8 }}>
              <img src="/logo2.png" alt="Klinik Hafizh" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
            </figure>
            <strong style={{ fontSize: '1.25rem' }}>Klinik Hafizh</strong>
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            <ScrollLink
              to="about"
              smooth
              duration={500}
              className="navbar-item animate__animated animate__fadeInRight animate__delay-1s has-text-black"
            >
              Tentang Kami
            </ScrollLink>
            <ScrollLink
              to="services"
              smooth
              duration={500}
              className="navbar-item animate__animated animate__fadeInRight animate__delay-2s has-text-black"
            >
              Layanan
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth
              duration={500}
              className="navbar-item animate__animated animate__fadeInRight animate__delay-3s has-text-black"
            >
              Kontak
            </ScrollLink>
            <a href="/profile" className="navbar-item animate__animated animate__fadeInRight animate__delay-4s">
              <figure className="image is-32x32" style={{ marginLeft: '8px' }}>
                <img className="is-rounded" src="./profile.jpg" alt="Profile" />
              </figure>
            </a>
          </div>
        </div>
      </motion.nav>


      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="hero is-medium is-bold"
        data-aos="fade-up"
        id="hero-section"
        style={{
          backgroundImage: 'url("/nik.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)'
        }}
      >
        <div
          className="hero-body"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(2px)',
            padding: '3rem 1.5rem',
            borderRadius: '0.5rem'
          }}
        >
          <div className="container">
            <div className="columns is-vcentered is-variable is-8">
              <motion.div
                className="column is-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 1 }}
              >
                <h1 className="title is-2 has-text-white">Selamat Datang di Klinik Hafizh</h1>
                <p className="has-text-white">Memberikan layanan kesehatan terbaik untuk Anda dan keluarga sejak 2010.</p>
                <ScrollLink
                  to="services"
                  smooth
                  duration={500}
                  className="button is-light is-medium mt-4"
                >
                  Lihat Layanan Kami
                </ScrollLink>
              </motion.div>
              <motion.div
                className="column is-6 has-text-centered"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <figure
                  className="image is-4by3"
                  style={{ marginTop: '70px' }} // Geser gambar ke bawah
                >
                  <img
                    src="./dokter.png"
                    alt="Ilustrasi Dokter"
                    style={{
                      maxHeight: '300px',
                      objectFit: 'contain',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </figure>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>


      {/* Daftar Dokter */}
      <section id="dokter" className="section has-background-light">
        <h2 className="title has-text-black has-text-centered mb-6" data-aos="fade-up">Daftar Dokter</h2>
        <div className="columns is-multiline is-centered">
          {[
            { img: './dokter.png', title: 'Dr. Ahmad Fauzi', desc: 'Spesialis Penyakit Dalam' },
            { img: './dokter.png', title: 'Dr. Siti Aminah', desc: 'Spesialis Anak' },
            { img: './dokter.png', title: 'Dr. Budi Santoso', desc: 'Dokter Gigi Umum' }
          ].map((item, i) => (
            <div key={i} className="column is-one-third" data-aos="zoom-in" data-aos-delay={i * 300}>
              <div className="box has-text-centered">
                {/* Mengurangi ukuran gambar dokter */}
                <img src={item.img} alt={item.title} style={{ width: '200px', height: 'auto' }} />
                <h3 className="subtitle is-5 has-text-black">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tentang Kami */}
      <section id="about" className="section">
        <div className="container">
          <div className="columns is-vcentered is-variable is-8">

            {/* Gambar */}
            <div className="column is-6 has-text-centered" data-aos="zoom-in">
              <figure className="image is-4by3" style={{ overflow: 'hidden', borderRadius: '12px' }}>
                <img
                  src="/dokterr.jpg"
                  alt="Ilustrasi Klinik"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  className="animate__animated animate__fadeIn"
                />
              </figure>
            </div>

            {/* Teks */}
            <div className="column is-6 has-text-left" data-aos="fade-left">
              <h2 className="title is-3 has-text-black mb-3">
                Tentang <span style={{ color: 'var(--primary)' }}>Klinik Kami</span>
              </h2>
              <p className="subtitle is-5 has-text-black mb-4">
                Klinik Sehat telah berdiri sejak 2010 dan berkomitmen untuk memberikan pelayanan kesehatan berkualitas.
              </p>
              <p className="has-text-black mb-4">
                Kami melayani berbagai kebutuhan kesehatan mulai dari pemeriksaan umum, vaksinasi, hingga layanan laboratorium modern. Selalu mengutamakan kenyamanan dan keamanan pasien.
              </p>
              <a href="/tentang"
                className="button is-primary is-light animate__animated animate__fadeInUp"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                Selengkapnya
              </a>
            </div>

          </div>
        </div>
      </section>


      {/* Layanan */}
      <section id="services" className="section has-background-light">
        <div className="container">
          <h2 className="title has-text-black has-text-centered mb-6" data-aos="fade-up">Layanan Kami</h2>
          <div className="columns is-multiline is-centered">
            {[
              { icon: 'fa-stethoscope', color: 'info', title: 'Pemeriksaan Umum', desc: 'Layanan kesehatan umum untuk semua usia.' },
              { icon: 'fa-syringe', color: 'success', title: 'Vaksinasi', desc: 'Tersedia berbagai jenis vaksin untuk anak dan dewasa.' },
              { icon: 'fa-vials', color: 'danger', title: 'Laboratorium', desc: 'Tes darah, urin, dan pemeriksaan lainnya.' }
            ].map((item, i) => (
              <div key={i} className="column is-one-third" data-aos="fade-up" data-aos-delay={i * 300}>
                <div className="box has-text-centered">
                  <span className={`icon is-large has-text-${item.color} mb-3`}>
                    <i className={`fas ${item.icon} fa-2x`}></i>
                  </span>
                  <h3 className="subtitle is-5 has-text-black">{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="has-text-centered mt-5" data-aos="fade-up" data-aos-delay="1000">
            <a href="/login" className="button is-primary is-medium pulse-soft">Reservasi Online</a>
          </div>
        </div>
      </section>


      {/* Kontak */}
      <section id="contact" className="section" data-aos="fade-up">
        <div className="container has-text-centered">
          <h2 className="title has-text-black has-text-centered ">Hubungi Kami</h2>
          <p>📍 Alamat: Jl. Kesehatan No.10, Jakarta</p>
          <p>📞 Telepon: (021) 12345678</p>
          <p>📧 Email: info@kliniksehat.com</p>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="footer has-background-primary has-text-black has-text-centered animate__animated animate__fadeIn"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="content">
          <p>&copy; 2025 Klinik Hafizh. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;