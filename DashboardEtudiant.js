import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function DashboardEtudiant({ user }) {
  const navigate = useNavigate();
  const [studentData] = useState({
    name: 'Jean Martin',
    performance: 67,
    moyenne: 16,
    seancesCompleted: 12,
    seancesTotal: 12,
    resultats: [
      { id: 1, title: 'Quiz Anatomie', note: 16, max: 20 },
      { id: 2, title: 'Contrôle continu', note: 13, max: 20 },
      { id: 3, title: 'Examen partiel', note: 18, max: 20 }
    ]
  });

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>📚 Mon suivi - {studentData.name}</h1>
        <button onClick={handleLogout} className="btn-logout">Déconnexion</button>
      </header>

      <div className="container">
        <div className="performance-card">
          <h2>Performance générale</h2>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${studentData.performance}%` }}
            ></div>
          </div>
          <p className="performance-text">
            {studentData.seancesCompleted}/{studentData.seancesTotal} séances • 
            Moyenne: {studentData.moyenne}/20
          </p>
        </div>

        <section className="section">
          <h2>Résultats récents</h2>
          <div className="results-list">
            {studentData.resultats.map(res => (
              <div key={res.id} className="result-card">
                <div>
                  <h3>{res.title}</h3>
                </div>
                <div className="note-display">
                  <span className="note-value">{res.note}/{res.max}</span>
                  {res.note >= 15 && <span className="badge success">Excellent</span>}
                  {res.note < 15 && res.note >= 12 && <span className="badge info">Bon</span>}
                  {res.note < 12 && <span className="badge warning">À améliorer</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Conseils</h2>
          <div className="advice-card">
            <p>🎯 Continue comme ça ! Tu es en bonne trajectoire.</p>
            <p>💡 Conseil : Concentre-toi sur les domaines où tu as moins de 15/20.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardEtudiant;
