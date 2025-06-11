import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import SidebarContext from "../SidebarContext";

const JanjiList = () => {
  const [janji, setJanji] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const { toggleSidebar } = useContext(SidebarContext);

  useEffect(() => {
    fetchJanji();
  }, []);

  const fetchJanji = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/janji");
      setJanji(res.data);
    } catch (err) {
      console.error("Error fetching janji:", err);
      alert("Gagal memuat data janji.");
    } finally {
      setLoading(false);
    }
  };

  const deleteJanji = async (id) => {
    if (!window.confirm("Yakin ingin menghapus janji ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/janji/${id}`);
      fetchJanji();
    } catch (err) {
      console.error("Error deleting janji:", err);
      alert("Gagal menghapus janji.");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/janji/${id}`, { status: newStatus });
      fetchJanji(); // Refresh data after update
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Gagal mengupdate status janji.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredJanji = janji.filter(item => {
    const query = searchTerm.toLowerCase();

    const patientName = item.user?.nama?.toLowerCase() || '';
    const phoneNumber = item.user?.no_tlp?.toLowerCase() || '';
    const specialist = item.dokter?.spesialis?.toLowerCase() || '';
    const doctorName = item.dokter?.nama?.toLowerCase() || '';
    const schedule = item.jadwal ? `${item.jadwal.hari} ${item.jadwal.waktu}`.toLowerCase() : '';
    const status = item.status?.toLowerCase() || '';

    return (
      patientName.includes(query) ||
      phoneNumber.includes(query) ||
      specialist.includes(query) ||
      doctorName.includes(query) ||
      schedule.includes(query) ||
      status.includes(query)
    );
  });

  const handleRowSelect = (id) => {
    setSelectedRows(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(rowId => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAllRows = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredJanji.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const getDropdownStyle = (status) => {
    let bgColor, textColor, borderColor;
    switch (status?.toLowerCase()) {
      case 'pending':
        bgColor = '#FFFDD0'; // Background kuning terang
        textColor = '#B76E00'; // Teks kuning tua
        borderColor = '#B76E00'; // Border kuning tua
        break;
      case 'approved':
        bgColor = '#D4EDDA'; // Background hijau terang
        textColor = '#28A745'; // Teks hijau tua
        borderColor = '#28A745'; // Border hijau tua
        break;
      case 'rejected':
        bgColor = '#F8D7DA'; // Background merah terang
        textColor = '#DC3545'; // Teks merah tua
        borderColor = '#DC3545'; // Border merah tua
        break;
      default:
        bgColor = '#E2E6EA'; // Default abu-abu
        textColor = '#6C757D'; // Default teks abu-abu
        borderColor = '#6C757D'; // Default border abu-abu
    }

    return {
      selectContainer: { // Gaya untuk div.select Bulma
        backgroundColor: bgColor,
        borderRadius: '5px',
        border: `1px solid ${borderColor}`,
        boxShadow: `0 0 0 1px ${borderColor}`, // Untuk efek "glow" di border
        overflow: 'hidden', // Penting agar border radius terlihat di select juga
      },
      selectElement: { // Gaya untuk elemen <select> di dalamnya
        color: textColor,
        fontWeight: 'bold',
        backgroundColor: 'transparent', // Penting agar background dari div.select terlihat
        border: 'none', // Hapus border default dari select
        boxShadow: 'none', // Hapus shadow default dari select
        width: '100%',
        height: '100%',
        paddingLeft: '10px', // Sesuaikan padding agar teks tidak terlalu mepet
        paddingRight: '2.25em', // Penting agar panah Bulma terlihat
        appearance: 'none', // Untuk konsistensi appearance dropdown di berbagai browser
        cursor: 'pointer',
      },
      optionElement: { // Gaya untuk elemen <option>
        color: 'black', // Opsi biasanya lebih baik terlihat dengan teks hitam
        backgroundColor: 'white', // Pastikan latar belakang opsi jelas
      }
    };
  };

  return (
    <div style={styles.container}> {/* Main container for padding and background */}
      <div style={styles.titleWithToggle}> {/* This div now controls the layout of the button and title */}
        <button
          onClick={toggleSidebar}
          style={styles.toggleButton}
          title="Toggle Sidebar"
        >
          ☰
        </button>
        <h2 style={styles.pageTitle}>Daftar Janji Temu</h2>
      </div>

      <div style={styles.headerContainer}>
        <div style={styles.searchAndActions}>
          <div style={styles.searchInputContainer}>
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={styles.searchInput}
            />
            <FaSearch style={styles.searchIcon} />
          </div>
          <Link to="./add" style={styles.addJanjiButton}>
            <FaPlus style={{ marginRight: '8px' }} /> Tambah Janji Temu
          </Link>
        </div>
      </div>

      {loading ? (
        <div style={styles.loadingProgress}>Loading data...</div>
      ) : (
        <div style={styles.tableBox}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeaderCheckbox}>
                  <input
                    type="checkbox"
                    onChange={handleSelectAllRows}
                    checked={selectedRows.length === filteredJanji.length && filteredJanji.length > 0}
                  />
                </th>
                <th style={styles.tableHeaderCell}>Nama Pasien</th>
                <th style={styles.tableHeaderCell}>No. Telepon</th>
                <th style={styles.tableHeaderCell}>Spesialis</th>
                <th style={styles.tableHeaderCell}>Nama Dokter</th>
                <th style={styles.tableHeaderCell}>Jadwal</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Dibuat</th>
                <th style={styles.tableHeaderCell}>Diperbarui</th>
                <th style={styles.tableHeaderCellLast}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredJanji.length === 0 ? (
                <tr>
                  <td colSpan="10" style={styles.noDataRow}>
                    Tidak ada data Janji Temu.
                  </td>
                </tr>
              ) : (
                filteredJanji.map((item) => {
                  const dropdownStyles = getDropdownStyle(item.status);

                  return (
                    <tr
                      key={item.id}
                      style={selectedRows.includes(item.id) ? styles.selectedTableRow : styles.tableRow}
                    >
                      <td style={styles.tableCellCheckbox}>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onChange={() => handleRowSelect(item.id)}
                        />
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.avatarCell}>
                          <div style={styles.avatarPlaceholder}>
                            {item.user?.nama ? item.user.nama.charAt(0).toUpperCase() : 'U'}
                          </div>
                          {item.user?.nama || 'N/A'}
                        </div>
                      </td>
                      <td style={styles.tableCell}>{item.user?.no_tlp || 'N/A'}</td>
                      <td style={styles.tableCell}>{item.dokter?.spesialis || 'N/A'}</td>
                      <td style={styles.tableCell}>{item.dokter?.nama || 'N/A'}</td>
                      <td style={styles.tableCell}>
                        {item.jadwal ? `${item.jadwal.hari} (${item.jadwal.waktu})` : 'N/A'}
                      </td>
                      {/* Selalu tampilkan dropdown Bulma */}
                      <td style={styles.tableCell}>
                        <div className="select is-small is-rounded" style={dropdownStyles.selectContainer}>
                          <select
                            value={item.status}
                            onChange={(e) => updateStatus(item.id, e.target.value)}
                            style={dropdownStyles.selectElement}
                          >
                            <option value="pending" style={dropdownStyles.optionElement}>Pending</option>
                            <option value="approved" style={dropdownStyles.optionElement}>Approved</option>
                            <option value="rejected" style={dropdownStyles.optionElement}>Rejected</option>
                          </select>
                        </div>
                      </td>
                      <td style={styles.tableCell}>{new Date(item.createdAt).toLocaleDateString('id-ID')}</td>
                      <td style={styles.tableCell}>{new Date(item.updatedAt).toLocaleDateString('id-ID')}</td>
                      <td style={styles.tableCellActions}>
                        <Link
                          to={`./edit/${item.id}`}
                          style={styles.actionButtonSmall}
                          title="Edit"
                        >
                          <FaEdit size={14} />
                        </Link>
                        <button
                          onClick={() => deleteJanji(item.id)}
                          style={{ ...styles.actionButtonSmall, ...styles.deleteButton }}
                          title="Hapus"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Define inline styles as a JavaScript object
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  titleWithToggle: { // NEW STYLE FOR ALIGNMENT
    display: 'flex',
    alignItems: 'center', // Align items vertically in the middle
    gap: '10px', // Add some space between the button and the title
    marginBottom: '20px',
  },
  pageTitle: {
    fontSize: '1.8em',
    fontWeight: '600',
    color: '#333',
    // marginBottom: '20px', // Removed from here as it's now handled by titleWithToggle
    textAlign: 'left',
  },
  headerContainer: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    padding: '15px 20px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
  },
  searchAndActions: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  searchInputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    padding: '10px 15px',
    paddingRight: '40px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '0.95em',
    width: '280px',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    // Pseudo-class ':focus' tidak bekerja langsung dengan inline style.
    // Gunakan CSS Modules atau library CSS-in-JS jika perlu.
  },
  searchIcon: {
    position: 'absolute',
    right: '15px',
    color: '#888',
  },
  addJanjiButton: {
    backgroundColor: '#6A1B9A',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 18px',
    fontSize: '0.95em',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(106, 27, 154, 0.2)',
    transition: 'background-color 0.2s ease',
    // Pseudo-class ':hover' tidak bekerja langsung dengan inline style.
  },
  loadingProgress: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '1.2em',
    color: '#666',
  },
  tableBox: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
  },
  tableHeaderRow: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
    height: '60px',
    fontSize: '0.9em',
    color: '#333',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  tableHeaderCheckbox: {
    padding: '15px 15px',
    width: '40px',
    textAlign: 'center',
    color: '#333',
  },
  tableHeaderCell: {
    padding: '15px 20px',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#333',
  },
  tableHeaderCellLast: {
    padding: '15px 20px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    color: '#333',
  },
  tableRow: {
    borderBottom: '1px solid #eee',
    transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    height: '70px',
    // Pseudo-class ':hover' tidak bekerja langsung dengan inline style.
  },
  selectedTableRow: {
    backgroundColor: '#FFFBE6',
    borderBottom: '1px solid #eee',
    boxShadow: '0 0 10px rgba(255, 204, 0, 0.1)',
    cursor: 'pointer',
    height: '70px',
  },
  tableCell: {
    padding: '12px 20px',
    color: '#333',
    fontSize: '0.95em',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tableCellCheckbox: {
    padding: '12px 15px',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  avatarCell: {
    display: 'flex',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#D1C4E9',
    color: '#5E35B1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '1.1em',
    marginRight: '10px',
    flexShrink: 0,
  },
  noDataRow: {
    textAlign: 'center',
    padding: '30px',
    color: '#999',
    fontSize: '1.1em',
  },
  tableCellActions: {
    textAlign: 'center',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
  },
  actionButtonSmall: {
    backgroundColor: '#E0E0E0',
    color: '#555',
    border: 'none',
    borderRadius: '6px',
    padding: '8px',
    fontSize: '0.85em',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
    margin: '0 4px',
    width: '32px',
    height: '32px',
    textDecoration: 'none',
    // Pseudo-class ':hover' tidak bekerja langsung dengan inline style.
  },
  deleteButton: {
    backgroundColor: '#FFEBEE',
    color: '#EF5350',
    // Pseudo-class ':hover' tidak bekerja langsung dengan inline style.
  },
  // headerBar is no longer used directly in JSX, but kept for reference if needed
  headerBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  toggleButton: {
    fontSize: '20px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#333',
  },
};

export default JanjiList;