import React, { useEffect } from 'react';
import '../reservasi.css'; // Pastikan ini mengimpor file CSS yang sudah diperbarui
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';

// Inisialisasi AOS di luar komponen untuk memastikan hanya sekali
AOS.init();

const ReservasiPage = () => {
    // Gunakan useEffect untuk inisialisasi AOS jika diperlukan,
    // atau untuk efek samping lainnya yang hanya berjalan sekali.
    useEffect(() => {
        // Jika Anda memiliki elemen yang dimuat secara dinamis setelah render awal,
        // AOS.refresh() dapat dipanggil di sini.
        // AOS.refresh();
    }, []);

    return (
        <div className="reservation-container">
            {/* Hero Section */}
            <div className="reservation-hero" data-aos="fade-down" data-aos-duration="1000">
                <h1 className="animate__animated animate__fadeInDown">TABLE RESERVATION</h1>
                <p className="breadcrumb">Home / Booking</p>
            </div>

            {/* Form Reservasi */}
            <motion.div
                className="reservation-form-section"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h2>TABLE RESERVATION</h2>
                <p>
                    Isi formulir di bawah ini untuk membuat reservasi meja Anda di Klinik Hafizh.
                    Kami berkomitmen untuk memberikan pelayanan terbaik.
                </p>

                <form className="reservation-form">
                    <div className="form-group">
                        <input type="date" placeholder="Date" />
                        <input type="text" placeholder="Nama Lengkap" />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Alamat Email" />
                        <input type="number" placeholder="Jumlah Tamu" min="1" />
                    </div>
                    <div className="form-group">
                        <input type="time" placeholder="Waktu Kedatangan" />
                        <input type="tel" placeholder="Nomor Telepon" />
                    </div>
                    <div className="form-group full-width">
                        <textarea placeholder="Pesan atau Keterangan Tambahan (max 300 karakter)" maxLength={300}></textarea>
                    </div>
                    <button type="submit" className="btn-submit">BOOK A TABLE →</button>
                </form>
            </motion.div>

            {/* --- Bagian Konten dari LandingPage (Daftar Dokter, Tentang Kami, Layanan, Kontak) --- */}

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
                        <div className="column is-6 has-text-centered" data-aos="fade-right">
                            <figure className="image is-4by3">
                                <img
                                    src="https://cdn.pixabay.com/photo/2020/06/17/11/09/doctor-5301226_960_720.png"
                                    alt="Ilustrasi Klinik"
                                    style={{ maxHeight: '300px', objectFit: 'contain' }}
                                />
                            </figure>
                        </div>
                        <div className="column is-6 has-text-left" data-aos="fade-left">
                            <h2 className="title is-3 has-text-black mb-3">
                                Tentang <span style={{ color: 'var(--primary-light)' }}>Klinik Kami</span>
                            </h2>
                            <p className="subtitle is-5 has-text-black mb-4">
                                Klinik Sehat telah berdiri sejak 2010 dan berkomitmen untuk memberikan pelayanan kesehatan berkualitas.
                            </p>
                            <p className="has-text-black mb-4">
                                Kami melayani berbagai kebutuhan kesehatan mulai dari pemeriksaan umum, vaksinasi, hingga layanan laboratorium modern. Selalu mengutamakan kenyamanan dan keamanan pasien.
                            </p>
                            <a href="/tentang" className="button animate__animated animate__fadeInUp" data-aos="fade-up" data-aos-delay="500">
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
                            { icon: 'fa-stethoscope', title: 'Pemeriksaan Umum', desc: 'Layanan kesehatan umum untuk semua usia.' },
                            { icon: 'fa-syringe', title: 'Vaksinasi', desc: 'Tersedia berbagai jenis vaksin untuk anak dan dewasa.' },
                            { icon: 'fa-vials', title: 'Laboratorium', desc: 'Tes darah, urin, dan pemeriksaan lainnya.' }
                        ].map((item, i) => (
                            <div key={i} className="column is-one-third" data-aos="fade-up" data-aos-delay={i * 300}>
                                <div className="box has-text-centered">
                                    <span className={`icon is-large mb-3`}>
                                        <i className={`fas ${item.icon} fa-2x`}></i>
                                    </span>
                                    <h3 className="subtitle is-5 has-text-black">{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Tombol "Reservasi Online" Dihapus dari sini */}
                </div>
            </section>

            {/* Kontak */}
            <section id="contact" className="section" data-aos="fade-up">
                <div className="container has-text-centered">
                    <h2 className="title has-text-black has-text-centered ">Hubungi Kami</h2>
                    <p>📍 Alamat: Jl. Kesehatan No.10, Bandung, Indonesia</p>
                    <p>📞 Telepon: (021) 12345678</p>
                    <p>📧 Email: info@kliniksehat.com</p>
                </div>
            </section>

            {/* Footer */}
            {/* Footer */}
            <motion.footer
                className="footer has-background-primary has-text-black has-text-centered animate__animated animate__fadeIn"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{ background: 'var(--primary-gradient)', color: 'var(--text-light)' }} /* Footer dengan gradasi */
            >
                <div className="content">
                    <p>&copy; 2025 Klinik Hafizh. All rights reserved.</p>
                </div>
            </motion.footer>
        </div>
    );
};

export default ReservasiPage;
