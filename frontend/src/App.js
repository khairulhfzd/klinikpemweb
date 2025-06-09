import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ReservasiPage from './components/ReservasiPage';
import AdminDashboard from './components/AdminDashboard';
import DashboardContent from './components/DashboardContent';

import DokterList from './components/dokter/DokterList';
import AddDokter from './components/dokter/AddDokter';
import EditDokter from './components/dokter/EditDokter';

import UserList from './components/user/UserList';
import AddUser from './components/user/AddUser';
import EditUser from './components/user/EditUser';

import JanjiList from './components/janji/JanjiList';
import AddJanji from './components/janji/AddJanji';
import EditJanji from './components/janji/EditJanji';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reservasi" element={<ReservasiPage />} />

        {/* Nested route untuk dashboard */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<DashboardContent />} />

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
