import React, { useState } from 'react';
import '../LoginPage.css';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="login-register-container">
      <motion.div
        className="form-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="switch-section">
          <h2>{isLogin ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}</h2>
          <p>{isLogin ? 'Silakan login untuk melanjutkan' : 'Daftar untuk nikmati layanan Klinik Hafizh'}</p>
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Daftar' : 'Login'}
          </button>
        </div>

        <motion.div
          className="form-section"
          key={isLogin ? 'login' : 'register'}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          {isLogin ? (
            <form className="form">
              <h3>Login</h3>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
          ) : (
            <form className="form">
              <h3>Register</h3>
              <input type="text" placeholder="Nama" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Daftar</button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
