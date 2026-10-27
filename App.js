import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './pages/Login';
import DashboardParent from './pages/DashboardParent';
import DashboardEtudiant from './pages/DashboardEtudiant';
import DashboardEncadrant from './pages/DashboardEncadrant';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // TODO: Récupérer le rôle depuis Firestore
        const role = localStorage.getItem('userRole') || 'parent';
        setUserRole(role);
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/parent" 
          element={user && userRole === 'parent' ? <DashboardParent user={user} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/etudiant" 
          element={user && userRole === 'etudiant' ? <DashboardEtudiant user={user} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/encadrant" 
          element={user && userRole === 'encadrant' ? <DashboardEncadrant user={user} /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={user ? <Navigate to={`/${userRole}`} /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
