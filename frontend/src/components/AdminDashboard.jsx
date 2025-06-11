import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import SidebarContext from './SidebarContext';

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const showDashboardHeader = location.pathname === '/admin';

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      <div style={styles.container}>
        {/* Sidebar */}
        {isSidebarOpen && (
          <aside style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
              <h2 style={styles.sidebarTitle}>Admin Panel</h2>
            </div>
            <p style={styles.menuLabel}>MENU NAVIGASI</p>
            <ul style={styles.menuList}>
              <li style={styles.menuItem}>
                <Link to="/admin" style={styles.menuLink}>
                  <span style={styles.icon}>🗂️</span> Dashboard
                </Link>
              </li>
              <li style={styles.menuItem}>
                <Link to="/admin/dokter" style={styles.menuLink}>
                  <span style={styles.icon}>👨🏻‍⚕️</span> Manajemen Dokter
                </Link>
              </li>
              <li style={styles.menuItem}>
                <Link to="/admin/user" style={styles.menuLink}>
                  <span style={styles.icon}>👥</span> Manajemen Users
                </Link>
              </li>
              <li style={styles.menuItem}>
                <Link to="/admin/janji" style={styles.menuLink}>
                  <span style={styles.icon}>📝</span> Manajemen Reservasi
                </Link>
              </li>
            </ul>
          </aside>
        )}

        {/* Main Content Area */}
        <div style={styles.mainContentArea}>
          {showDashboardHeader && (
            <header style={styles.header}>
              <div style={styles.headerTopRow}>
                <div style={styles.headerLeft}>
                  <button
                    onClick={toggleSidebar}
                    style={styles.toggleButton}
                  >
                    ☰
                  </button>
                  <h1 style={styles.pageTitle}>Dashboard Admin</h1>
                </div>
                <div style={styles.headerRight}>
                  <div style={styles.userProfile}>
                    <span style={styles.icon}>👤</span>
                    <span>Admin User</span>
                  </div>
                </div>
              </div>
            </header>
          )}

          {/* Content Area for Nested Routes */}
          <main style={styles.contentSection}>
            <div style={styles.contentBox}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#4A148C',
    color: '#fff',
    padding: '20px',
    flexShrink: 0,
  },
  sidebarHeader: {
    marginBottom: '30px',
    paddingBottom: '15px',
    borderBottom: '1px solid #6A1B9A',
  },
  sidebarTitle: {
    fontWeight: 'bold',
    fontSize: '1.5em',
  },
  menuLabel: {
    color: '#ccc',
    fontSize: '0.85em',
    textTransform: 'uppercase',
    marginBottom: '15px',
    letterSpacing: '0.5px',
  },
  menuList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  menuItem: {
    marginBottom: '15px',
  },
  menuLink: {
    color: '#ddd',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0',
    transition: 'color 0.2s ease',
  },
  icon: {
    marginRight: '10px',
  },
  mainContentArea: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#fff',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  headerTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5em',
    cursor: 'pointer',
    marginRight: '15px',
    color: '#333',
  },
  pageTitle: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
  },
  contentSection: {
    flex: 1,
  },
  contentBox: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "1.5rem",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    minHeight: 'calc(100vh - 40px - 90px)',
  },
};

export default AdminDashboard;
