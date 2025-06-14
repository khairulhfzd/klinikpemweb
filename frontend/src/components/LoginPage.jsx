import React, { useState } from 'react';
import '../LoginPage.css';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nama, setNama] = useState('');
  const [gender, setGender] = useState('');
  const [alamat, setAlamat] = useState('');
  const [noTlp, setNoTlp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      // proses login
      const res = await axios.post("http://localhost:5000/auth/login", { email, password });
      const { token } = res.data;

      // simpan token ke localStorage
      localStorage.setItem("token", token);

      // Ambil data user (me endpoint)
      const meRes = await axios.get("http://localhost:5000/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { role } = meRes.data;
      localStorage.setItem("role", role);

      // Redirect sesuai role
      if (role === "admin") {
        navigate("/admin");
      } else {
        const redirectTo = location.state?.from || "/reservasi";
        navigate(redirectTo);
      }

    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.msg || "Email atau Password salah.";
      setErrorMsg(msg);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validasi tambahan (optional)
    if (!email.includes('@')) {
      setErrorMsg("Format email tidak valid.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/auth/register", {
        nama, email, password, gender, alamat, no_tlp: noTlp
      });

      alert("Registrasi berhasil! Silakan login.");
      setIsLogin(true);
      setEmail('');
      setPassword('');
      setNama('');
      setGender('');
      setAlamat('');
      setNoTlp('');

    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.msg || "Registrasi gagal.";
      setErrorMsg(msg);
    }
  };

  return (
    <div className="login-register-container">
      <motion.div className="form-container" variants={containerVariants} initial="hidden" animate="visible">
        <div className="switch-section">
          <h2>{isLogin ? "Selamat Datang Kembali" : "Daftar Akun Baru"}</h2>
          <p>{isLogin ? "Silakan login untuk melanjutkan" : "Lengkapi form untuk membuat akun baru"}</p>
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Daftar" : "Sudah Punya Akun? Login"}
          </button>
        </div>

        <motion.div className="form-section" key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          {isLogin ? (
            <form className="form" onSubmit={handleLogin}>
              <h3>Login</h3>
              {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="submit">Login</button>
            </form>
          ) : (
            <form className="form" onSubmit={handleRegister}>
              <h3>Register</h3>
              {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
              <input type="text" placeholder="Nama" value={nama} onChange={e => setNama(e.target.value)} required />
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              <input type="text" placeholder="Gender (L/P)" value={gender} onChange={e => setGender(e.target.value)} />
              <input type="text" placeholder="Alamat" value={alamat} onChange={e => setAlamat(e.target.value)} />
              <input type="text" placeholder="No Telepon" value={noTlp} onChange={e => setNoTlp(e.target.value)} />
              <button type="submit">Daftar</button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
