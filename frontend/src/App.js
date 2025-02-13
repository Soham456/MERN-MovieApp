import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import AddMoviePage from './pages/AddMoviePage';
import AuthGuard from './auth/authGaurd';
const App = () => {
  return (
    <Router >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/admin" element={<AuthGuard><AdminPage /></AuthGuard>} />
  <Route path="/add-movie" element={<AddMoviePage />} />
      </Routes>
    </Router>
  );
};

export default App;
