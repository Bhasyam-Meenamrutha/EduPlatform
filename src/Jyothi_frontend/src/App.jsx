import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import StudentDashboard from './components/dashboard/StudentDashboard';
import OrganizationDashboard from './components/dashboard/OrganizationDashboard';
import Home from './components/Home';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f8fafc;
    width: 100%;
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
  }

  main {
    flex: 1;
    width: 100%;
    max-width: 100%;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/org-dashboard" element={<OrganizationDashboard />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" />
    </Router>
  );
}

export default App;