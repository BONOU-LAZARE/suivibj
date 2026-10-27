# 🎓 Plateforme de Suivi - Médecine

Plateforme web/mobile pour suivre en temps réel les étudiants en médecine. Parents, étudiants et encadrants ont leurs propres dashboards sécurisés.

## 🚀 Déploiement Rapide (5 min)

### Étape 1 : Cloner le repository

```bash
git clone https://github.com/YOUR_USERNAME/plateforme-suivi-etudiants.git
cd plateforme-suivi-etudiants
```

### Étape 2 : Créer un projet Firebase

1. Aller sur [Firebase Console](https://console.firebase.google.com)
2. Cliquer "Créer un projet"
3. Nommer le projet `suivi-etudiants-bj`
4. Accepter les conditions et créer

### Étape 3 : Activer l'authentification

1. Dans Firebase Console → **Authentification**
2. Cliquer **Démarrer**
3. Activer **Email/Mot de passe**
4. Activer **Google Sign-In** (optionnel)

### Étape 4 : Créer Firestore Database

1. Dans Firebase Console → **Firestore Database**
2. Cliquer **Créer une base de données**
3. Sélectionner **Mode test**
4. Choisir la région (Europe)
5. Créer

### Étape 5 : Récupérer les clés Firebase

1. Dans Firebase Console → **Paramètres du projet** ⚙️
2. Aller à **Vos apps** → Créer une app web
3. Copier les clés (API Key, Auth Domain, Project ID, etc.)

### Étape 6 : Configurer les variables d'environnement

```bash
# Créer le fichier .env
cp .env.example .env

# Éditer .env et coller vos clés Firebase
# .env
REACT_APP_FIREBASE_API_KEY=votre_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=votre_auth_domain.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=votre_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=votre_bucket.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
REACT_APP_FIREBASE_APP_ID=votre_app_id
```

### Étape 7 : Installer et tester localement

```bash
# Installer les dépendances
npm install

# Lancer en local
npm start

# L'app s'ouvre sur http://localhost:3000
```

### Étape 8 : Déployer sur Netlify

#### Option A : Via GitHub + Netlify (Recommandé)

1. **Pusher sur GitHub**
   ```bash
   git add .
   git commit -m "Initial commit - Plateforme suivi"
   git push origin main
   ```

2. **Connecter à Netlify**
   - Aller sur [netlify.com](https://netlify.com)
   - Cliquer **Add new site** → **Import an existing project**
   - Sélectionner GitHub et votre repository
   - Cliquer **Deploy**

3. **Ajouter les variables d'environnement dans Netlify**
   - Dans Netlify → **Site settings** → **Build & deploy** → **Environment**
   - Cliquer **Edit variables**
   - Ajouter les 6 variables Firebase (.env)

4. **Redéployer**
   - Aller à **Deploys** → **Trigger deploy** → **Deploy site**

#### Option B : CLI Netlify (Alternative)

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy --prod

# Ou avec les variables
netlify env:set REACT_APP_FIREBASE_API_KEY votre_key
netlify deploy --prod
```

---

## 📊 Utilisation

### Accès Parent
- **Identifiants démo** : `parent@example.com` / `password123`
- Suivi d'un enfant spécifique
- Voir : séances, notes, exercices, paiements

### Accès Étudiant
- **Identifiants démo** : `etudiant@example.com` / `password123`
- Suivi personnel
- Voir : résultats, statistiques, conseils

### Accès Encadrant
- **Identifiants démo** : `encadrant@example.com` / `password123`
- Gestion complète des étudiants
- Saisie : séances, notes, exercices, évaluations
- Voir statistiques globales

---

## 🛠 Structure du Projet

```
plateforme-suivi-react/
├── src/
│   ├── firebase/
│   │   └── config.js           # Configuration Firebase
│   ├── pages/
│   │   ├── Login.js            # Page de connexion
│   │   ├── DashboardParent.js  # Dashboard parent
│   │   ├── DashboardEtudiant.js # Dashboard étudiant
│   │   └── DashboardEncadrant.js # Dashboard encadrant
│   ├── App.js                  # Routage principal
│   ├── App.css                 # Styles
│   └── index.js                # Point d'entrée React
├── public/
│   └── index.html              # HTML principal
├── package.json                # Dépendances
├── netlify.toml                # Configuration Netlify
├── .env.example                # Exemple de variables
└── .gitignore                  # Fichiers à ignorer
```

---

## 🔄 Prochaines Étapes (Phase 2)

- [ ] Intégration Google Classroom
- [ ] Import/Export Excel
- [ ] Notifications push (parents)
- [ ] Export PDF (rapports)
- [ ] Dark mode
- [ ] Analytics avancées

---

## 📞 Support

- **Firebase docs** : https://firebase.google.com/docs
- **React docs** : https://react.dev
- **Netlify docs** : https://docs.netlify.com

---

**Made with ❤️ pour les étudiants en médecine**

**URL Netlify** : `suivi-etudiants.netlify.app`
