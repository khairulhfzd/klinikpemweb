import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Tentang.css';
import { isAuthenticated } from '../utils/auth';

const Tentang = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        setIsLoggedIn(isAuthenticated());
      }, []);

    return (
        <div className="tentang-page">

            {/* Hero Section */}
            <section className="hero-section" id="hero">
                <div className="hero-overlay">
                    <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        Mengenal Klinik Hafizh
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
                        Kami berkomitmen menjadi penyedia layanan kesehatan terbaik sejak 2010.
                    </motion.p>
                    <div className="has-text-centered mt-5" data-aos="fade-up" data-aos-delay="1000">
                        {isLoggedIn ? (
                            <a href="/reservasi" className="button is-primary is-medium pulse-soft">
                                Reservasi Online
                            </a>
                        ) : (
                            <a href="/login" className="button is-primary is-medium pulse-soft">
                                Reservasi Online
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Layanan Section */}
            <section className="services-modal-section" style={{
                position: 'relative',
                zIndex: 10,
                marginTop: '-120px',
                padding: '3rem 1rem',
            }}>
                <div className="container" style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                    padding: '2rem',
                    maxWidth: '960px',
                    margin: '0 auto',
                }} data-aos="fade-up">
                    <h2 className="title has-text-black has-text-centered" style={{ marginBottom: '2rem' }}>
                        Layanan Kami
                    </h2>
                    <div className="columns is-multiline is-variable is-6 is-centered">
                        {[
                            { icon: 'fa-stethoscope', color: 'info', title: 'Pemeriksaan Umum', desc: 'Layanan kesehatan dasar untuk semua usia.' },
                            { icon: 'fa-syringe', color: 'success', title: 'Vaksinasi', desc: 'Melindungi dari berbagai penyakit menular.' },
                            { icon: 'fa-vials', color: 'danger', title: 'Laboratorium', desc: 'Tes laboratorium lengkap dan akurat.' },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="column is-12-mobile is-6-tablet is-4-desktop"
                                style={{ textAlign: 'center' }}
                                data-aos="fade-up"
                                data-aos-delay={i * 100}
                            >
                                <span
                                    className={`icon has-text-${item.color}`}
                                    style={{
                                        fontSize: '2.5rem',
                                        marginBottom: '1rem',
                                        display: 'inline-block',
                                    }}
                                >
                                    <i className={`fas ${item.icon}`}></i>
                                </span>
                                <h3 className="subtitle is-5 has-text-black" style={{ marginBottom: '0.5rem' }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Sejarah Section */}
            <section className="sejarah-section" id="sejarah" data-aos="fade-up" style={{ marginTop: '2rem' }}> {/* Sesuaikan margin atas */}
                <div className="content-wrapper">
                    <img src="/dokterr.jpg" alt="Klinik Sejarah" className="img-sejarah" />
                    <div className="text">
                        <h2>Sejarah Kami</h2>
                        <p>
                            Klinik Hafizh berdiri sejak tahun 2010 di Bandung, dimulai dengan satu dokter dan satu ruang periksa. Seiring waktu,
                            kami berkembang menjadi pusat layanan kesehatan lengkap dengan berbagai spesialis dan laboratorium modern.
                        </p>
                        <p>
                            Fokus kami selalu pada kenyamanan, kepercayaan, dan mutu layanan bagi pasien dari segala usia.
                        </p>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            {/* Video Section */}
            <section className="video-section" id="video" data-aos="fade-up" style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                <div className="video-container" style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                }}>
                    <video
                        src="/vid.mp4"
                        controls
                        autoPlay
                        muted
                        playsInline
                        style={{
                            width: '100%',
                            borderRadius: '10px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        Maaf, browser Anda tidak mendukung pemutar video.
                    </video>
                </div>
            </section>


            {/* Map & Kontak Section */}
            <section className="map-section" id="lokasi" data-aos="fade-up">
                <div className="content-wrapper">
                    <div className="kontak">
                        <h2>Hubungi Kami</h2>
                        <p>📍 Alamat: Jl. Kesehatan No.10, Bandung, Indonesia</p>
                        <p>📞 Telepon: (62) 87263817263</p>
                        <p>📧 Email: @klinikhafizh.com</p>
                    </div>
                    <div className="map">
                        <iframe
                            className="embed-map-frame"
                            title="Lokasi Klinik Hafizh"
                            src="https://maps.google.com/maps?width=600&height=400&hl=en&q=ITENAS%20GD%202&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>

                </div>
            </section>

            <motion.footer
                style={{ backgroundColor: "#0d6efd", color: "white" }}
                className="footer has-text-centered animate__animated animate__fadeIn"
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

export default Tentang;