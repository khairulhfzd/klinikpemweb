import React from "react";

const LoginPage = () => {
  return (
    <section
      className="hero is-fullheight"
      style={{
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
      }}
    >
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered is-vcentered box"
               style={{
                 borderRadius: "12px",
                 boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                 backgroundColor: "#ffffffcc",
               }}
          >

            {/* Kiri: Informasi Gambar */}
            <div className="column is-half has-text-centered">
              <figure className="image is-3by4">
                <img
                  src="/d5c0d685-684a-4f0f-8d5f-77a79f391f81.png"
                  alt="Informasi Klinik"
                  style={{
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </figure>
            </div>

            {/* Kanan: Form Login */}
            <div className="column is-5-tablet is-5-desktop">
              <div className="box" style={{ borderRadius: "12px" }}>
                <div className="has-text-centered mb-5">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    style={{ height: "80px", marginBottom: "10px" }}
                  />
                  <h2 className="title is-4 has-text-link">RESERVASI ONLINE</h2>
                </div>

                {/* Email */}
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      className="input is-info"
                      type="email"
                      placeholder="Masukkan email"
                    />
                    <span className="icon is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>

                {/* Password */}
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      className="input is-info"
                      type="password"
                      placeholder="Masukkan password"
                    />
                    <span className="icon is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                </div>

                {/* Tombol Login */}
                <div className="field mt-4">
                  <button className="button is-link is-fullwidth is-medium">
                    Login
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
