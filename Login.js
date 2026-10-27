import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('parent');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let user;
      if (isSignUp) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        user = result.user;
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        user = result.user;
      }

      localStorage.setItem('userRole', role);
      navigate(`/${role}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🎓 Plateforme de Suivi</h1>
        <p>Suivez votre progression en médecine</p>

        <form onSubmit={handleAuth}>
          <div className="form-group">
            <label>Rôle</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="parent">👨‍👩‍👦 Parent</option>
              <option value="etudiant">📚 Étudiant</option>
              <option value="encadrant">👨‍🏫 Encadrant</option>
            </select>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary">
            {isSignUp ? 'S\'inscrire' : 'Se connecter'}
          </button>
        </form>

        <div className="toggle-auth">
          <p>
            {isSignUp ? 'Vous avez un compte ? ' : 'Pas encore de compte ? '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="link-button"
            >
              {isSignUp ? 'Se connecter' : 'S\'inscrire'}
            </button>
          </p>
        </div>

        <div className="demo-credentials">
          <p><strong>Démo :</strong> test@example.com / password123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
