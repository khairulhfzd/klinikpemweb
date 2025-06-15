import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ReservasiPage from './components/ReservasiPage';
import AdminDashboard from './components/AdminDashboard';
import DashboardContent from './components/DashboardContent';
import Tentang from './components/Tentang'; // Added from old code

import DokterList from './components/dokter/DokterList';
import AddDokter from './components/dokter/AddDokter';
import EditDokter from './components/dokter/EditDokter';

import UserList from './components/user/UserList';
import AddUser from './components/user/AddUser';
import EditUser from './components/user/EditUser';

import JanjiList from './components/janji/JanjiList';
import AddJanji from './components/janji/AddJanji';
import EditJanji from './components/janji/EditJanji';

import ProtectedRoute from './components/ProtectedRoute'; // Essential for secure routes

function App() {
  return (
    <Router>
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* About Page (from old code) */}
        <Route path="/tentang" element={<Tentang />} />

        {/* Reservasi Page (protected, only for users) */}
        <Route 
          path="/reservasi" 
          element={
            <ProtectedRoute>
              <ReservasiPage />
            </ProtectedRoute>
          } 
        />

        {/* Admin Panel (protected, only for admins) */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested routes for Admin Dashboard */}
          <Route index element={<DashboardContent />} /> {/* Default content for /admin */}
          
          <Route path="dokter" element={<DokterList />} />
          <Route path="dokter/add" element={<AddDokter />} />
          <Route path="dokter/edit/:id" element={<EditDokter />} />
          
          <Route path="user" element={<UserList />} />
          <Route path="user/add" element={<AddUser />} />
          <Route path="user/edit/:id" element={<EditUser />} />
          
          <Route path="janji" element={<JanjiList />} />
          <Route path="janji/add" element={<AddJanji />} />
          <Route path="janji/edit/:id" element={<EditJanji />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
