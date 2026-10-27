import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function DashboardEncadrant({ user }) {
  const navigate = useNavigate();
  const [students, setStudents] = useState([
    { id: 1, name: 'Marie Dupont', groupe: 'Cardiologie', seances: 8, total: 12, moyenne: 14.5, paiement: 125000 },
    { id: 2, name: 'Jean Martin', groupe: 'Cardiologie', seances: 12, total: 12, moyenne: 16, paiement: 0 },
    { id: 3, name: 'Sophie Lefevre', groupe: 'Chirurgie', seances: 10, total: 12, moyenne: 15, paiement: 62500 }
  ]);

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', groupe: '' });

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.groupe) {
      setStudents([...students, {
        id: students.length + 1,
        ...newStudent,
        seances: 0,
        total: 12,
        moyenne: 0,
        paiement: 0
      }]);
      setNewStudent({ name: '', groupe: '' });
      setShowAddStudent(false);
    }
  };

  const groupes = ['Cardiologie', 'Chirurgie', 'Anatomie'];
  const studentsByGroupe = groupes.map(g => ({
    groupe: g,
    students: students.filter(s => s.groupe === g)
  }));

  return (
    <div className="dashboard encadrant-dashboard">
      <header className="header">
        <h1>👨‍🏫 Gestion des étudiants</h1>
        <button onClick={handleLogout} className="btn-logout">Déconnexion</button>
      </header>

      <div className="container">
        <button 
          className="btn-primary btn-add-student"
          onClick={() => setShowAddStudent(!showAddStudent)}
        >
          + Ajouter un étudiant
        </button>

        {showAddStudent && (
          <div className="add-student-form">
            <input
              type="text"
              placeholder="Nom de l'étudiant"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <select
              value={newStudent.groupe}
              onChange={(e) => setNewStudent({ ...newStudent, groupe: e.target.value })}
            >
              <option value="">Sélectionner un groupe</option>
              {groupes.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <button onClick={handleAddStudent} className="btn-primary btn-small">Ajouter</button>
            <button onClick={() => setShowAddStudent(false)} className="btn-secondary btn-small">Annuler</button>
          </div>
        )}

        {studentsByGroupe.map(({ groupe, students: groupeStudents }) => (
          groupeStudents.length > 0 && (
            <section key={groupe} className="section">
              <h2>📌 {groupe.toUpperCase()} ({groupeStudents.length} étudiants)</h2>
              <div className="students-list">
                {groupeStudents.map(student => (
                  <div key={student.id} className="student-card">
                    <div className="student-info">
                      <h3>{student.name}</h3>
                      <p className="student-stats">
                        {student.seances}/{student.total} séances • {student.moyenne}/20
                      </p>
                      {student.paiement > 0 && (
                        <p className="student-debt">À payer: {student.paiement.toLocaleString()} CFA</p>
                      )}
                    </div>
                    <button className="btn-view">Détails →</button>
                  </div>
                ))}
              </div>
            </section>
          )
        ))}

        <section className="section">
          <h2>Actions rapides</h2>
          <div className="actions-grid">
            <button className="action-btn">📝 Ajouter une séance</button>
            <button className="action-btn">⭐ Entrer des notes</button>
            <button className="action-btn">📋 Créer un exercice</button>
            <button className="action-btn">📅 Planifier une évaluation</button>
          </div>
        </section>

        <section className="section">
          <h2>Statistiques globales</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Total étudiants</p>
              <p className="stat-value">{students.length}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Taux d'assiduité</p>
              <p className="stat-value">
                {Math.round(students.reduce((acc, s) => acc + (s.seances / s.total), 0) / students.length * 100)}%
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Moyenne classe</p>
              <p className="stat-value">
                {(students.reduce((acc, s) => acc + s.moyenne, 0) / students.length).toFixed(1)}/20
              </p>
            </div>
            <div className="stat-card warning">
              <p className="stat-label">Paiements en cours</p>
              <p className="stat-value">
                {students.filter(s => s.paiement > 0).length}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardEncadrant;
