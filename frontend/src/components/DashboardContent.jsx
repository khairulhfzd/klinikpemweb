import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardContent = () => {
  const [summary, setSummary] = useState({
    totalDoctors: 0,
    totalVisits: 0,
    totalReservations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [doktersRes, usersRes, janjiRes] = await Promise.all([
          axios.get('http://localhost:5000/dokters'),
          axios.get('http://localhost:5000/users'),
          axios.get('http://localhost:5000/janji'),
        ]);

        setSummary({
          totalDoctors: doktersRes.data.length,
          totalVisits: usersRes.data.length,
          totalReservations: janjiRes.data.length,
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <div>Loading data...</div>;

  return (
    <div className="columns is-multiline is-variable is-4">
      <div className="column is-one-third">
        <div className="box has-text-centered" style={cardStyle}>
          <span className="icon is-large has-text-link">
            <i className="fa fa-user-md fa-2x"></i>
          </span>
          <h1 className="title is-4 mt-2">
            {summary.totalDoctors.toLocaleString()}<sup>+</sup>
          </h1>
          <p>Total Dokter Terdaftar di Klinik Sehat</p>
        </div>
      </div>

      <div className="column is-one-third">
        <div className="box has-text-centered" style={cardStyle}>
          <span className="icon is-large has-text-link">
            <i className="fas fa-users fa-2x"></i>
          </span>
          <h1 className="title is-4 mt-2">
            {summary.totalVisits.toLocaleString()}<sup>+</sup>
          </h1>
          <p>Total Kunjungan Pasien Ke Klinik Sehat</p>
        </div>
      </div>

      <div className="column is-one-third">
        <div className="box has-text-centered" style={cardStyle}>
          <span className="icon is-large has-text-link">
            <i className="fa fa-calendar-check fa-2x"></i>
          </span>
          <h1 className="title is-4 mt-2">
            {summary.totalReservations.toLocaleString()}<sup>+</sup>
          </h1>
          <p>Total Data Reservasi Janji Temu</p>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  borderRadius: '12px',
  padding: '2rem',
  background: '#fff',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
};

export default DashboardContent;
