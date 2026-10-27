import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function DashboardParent({ user }) {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: 'Marie Dupont',
    groupes: ['Cardiologie', 'Chirurgie'],
    seances: { completed: 8, total: 12 },
    heures: 24,
    moyenne: 14.5,
    montantDu: 125000,
    exercices: [
      { id: 1, title: 'Anatomie cardiaque', status: 'En attente', deadline: '10 oct' },
      { id: 2, title: 'Physiologie cardiaque', status: 'Fait', deadline: '05 oct' }
    ],
    evaluations: [
      { id: 1, title: 'Examen Cardiologie', date: '15 octobre 2026' },
      { id: 2, title: 'Contrôle Chirurgie', date: '20 octobre 2026' }
    ]
  });

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>📊 Suivi de {student.name}</h1>
        <button onClick={handleLogout} className="btn-logout">Déconnexion</button>
      </header>

      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Séances</p>
            <p className="stat-value">{student.seances.completed}/{student.seances.total}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Heures</p>
            <p className="stat-value">{student.heures}h</p>
          </div>
          <div className="stat-card success">
            <p className="stat-label">Moyenne</p>
            <p className="stat-value">{student.moyenne}/20</p>
          </div>
          <div className="stat-card warning">
            <p className="stat-label">À payer</p>
            <p className="stat-value">{student.montantDu.toLocaleString()} CFA</p>
          </div>
        </div>

        <section className="section">
          <h2>Exercices en attente</h2>
          <div className="exercise-list">
            {student.exercices.map(ex => (
              <div key={ex.id} className="exercise-card">
                <div>
                  <h3>{ex.title}</h3>
                  <p>À rendre : {ex.deadline}</p>
                </div>
                <span className={`badge ${ex.status === 'Fait' ? 'success' : 'danger'}`}>
                  {ex.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Prochaines évaluations</h2>
          <div className="evaluations-list">
            {student.evaluations.map(ev => (
              <div key={ev.id} className="eval-card">
                <div>
                  <h3>{ev.title}</h3>
                  <p>📅 {ev.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardParent;
