import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f6fa" }}>
      {/* Navbar */}
      <nav className="navbar has-shadow" style={{ backgroundColor: "#2c3e50", color: "#ecf0f1" }}>
        <div className="navbar-brand">
          <button
            className="button is-dark ml-3"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <span className="navbar-item has-text-weight-bold has-text-white ml-2">
            Dashboard Admin
          </span>
        </div>
      </nav>

      {/* Body */}
      <div className="columns m-0" style={{ minHeight: "calc(100vh - 3.25rem)" }}>
        {/* Sidebar */}
        {isSidebarOpen && (
          <aside className="column is-2 p-4" style={{ backgroundColor: "#34495e", color: "#ecf0f1" }}>
            <p className="menu-label has-text-white">MENU NAVIGASI</p>
            <ul className="menu-list">
              <li>
                <Link to="/admin" className="has-text-white">
                  <span className="icon mr-1">🗂️</span> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/dokter" className="has-text-white">
                  <span className="icon mr-1">👨🏻‍⚕</span> Manajemen Dokter
                </Link>
              </li>
              <li>
                <Link to="/admin/user" className="has-text-white">
                  <span className="icon mr-1">👥</span> Manajemen Users
                </Link>
              </li>
            </ul>
          </aside>
        )}

        {/* Content */}
        <main className={`column p-5 ${isSidebarOpen ? "is-10" : "is-full"}`}>
          <div
            className="box"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              padding: "1.5rem",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Outlet /> {/* Ini penting agar nested route ditampilkan di sini */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
