
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Product from './pages/Product';
import Report from './pages/Report';
import Accounts from './pages/Accounts';
import Settings from './pages/Settings';
import Login from './pages/Login';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = (enteredUsername, enteredPassword) => {
    if (enteredUsername === enteredPassword) {
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/product" element={<Product />} />
              <Route path="/report" element={<Report />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/settings" element={<Settings />} />
            </>
          ) : (
            <Route path="/" element={<Login handleLogin={handleLogin} />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
