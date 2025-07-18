# 🎯 Dashboard RH - Engagement Citoyen

Un tableau de bord moderne et interactif pour visualiser les données d'engagement citoyen des collaborateurs d'une entreprise.

![Dashboard Preview](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Dashboard+RH+-+Engagement+Citoyen)

## ✨ Fonctionnalités

### 📊 Métriques principales
- **Heures totales d'engagement** - Temps consacré aux missions citoyennes
- **Collaborateurs engagés** - Nombre de participants actifs
- **Taux d'engagement** - Pourcentage de collaborateurs certifiés
- **Missions terminées** - Suivi des projets complétés

### 📈 Visualisations interactives
- **Graphique en camembert** - Répartition par thématique (Éducation, Éco-responsabilité, Inclusion, Mentorat)
- **Graphique en barres** - Évolution des heures par mois
- **Graphique linéaire** - Tendances d'engagement dans le temps
- **Top 5 collaborateurs** - Classement des plus engagés

### 🔍 Filtres avancés
- **Période** - Mois, trimestre, année ou période personnalisée
- **Thématique** - Filtrage par domaine d'engagement
- **Département/Équipe** - Vue par organisation
- **Réinitialisation** - Retour aux données complètes

### 🎨 Interface utilisateur
- **Design responsive** - Adapté mobile, tablette et desktop
- **Mode sombre** - Basculement jour/nuit
- **Export CSV** - Téléchargement des données filtrées
- **Animations fluides** - Transitions et interactions soignées

## 🛠️ Stack technique

### Frontend
- **React 18** - Framework JavaScript moderne
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Recharts** - Bibliothèque de graphiques React
- **Lucide React** - Icônes SVG optimisées

### Données
- **JSON Mock** - Données de démonstration
- **Context API** - Gestion d'état globale
- **Hooks personnalisés** - Logique métier réutilisable

### Outils de développement
- **ESLint** - Linting JavaScript/React
- **PostCSS** - Traitement CSS
- **Date-fns** - Manipulation des dates

## 🚀 Installation et démarrage

### Prérequis
- Node.js 16+ 
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/votre-username/hr-engagement-dashboard.git
cd hr-engagement-dashboard

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le dashboard sera accessible sur `http://localhost:3000`

### Scripts disponibles
```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Aperçu du build
npm run lint     # Vérification du code
```

## 📁 Structure du projet

```
src/
├── components/
│   ├── layout/          # Composants de mise en page
│   │   ├── DashboardLayout.jsx
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── charts/          # Graphiques et visualisations
│   │   ├── EngagementPieChart.jsx
│   │   ├── HoursBarChart.jsx
│   │   ├── TrendLineChart.jsx
│   │   └── TopEmployeesChart.jsx
│   ├── filters/         # Composants de filtrage
│   │   ├── DateFilter.jsx
│   │   ├── ThemeFilter.jsx
│   │   └── TeamFilter.jsx
│   ├── metrics/         # Métriques et KPI
│   │   ├── MetricsGrid.jsx
│   │   └── MetricCard.jsx
│   └── common/          # Composants réutilisables
│       ├── LoadingSpinner.jsx
│       └── ExportButton.jsx
├── context/             # Gestion d'état globale
│   └── DashboardContext.jsx
├── data/               # Données mock
│   └── mockData.json
└── styles/             # Styles globaux
    └── globals.css
```

## 📊 Structure des données

### Collaborateurs
```json
{
  "id": 1,
  "name": "Marie Dubois",
  "department": "IT",
  "team": "Frontend",
  "position": "Développeuse Senior",
  "totalHours": 45,
  "certifications": ["Éco-responsabilité", "Mentorat"]
}
```

### Missions
```json
{
  "id": 1,
  "title": "Cours de programmation pour lycéens",
  "theme": "Éducation",
  "employeeId": 1,
  "hours": 12,
  "date": "2024-01-15",
  "status": "completed",
  "location": "Lycée Jean Moulin, Paris"
}
```

### Thématiques
```json
{
  "id": "education",
  "name": "Éducation",
  "color": "#3b82f6",
  "description": "Formation, enseignement et transmission de compétences"
}
```

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans `tailwind.config.js` et peuvent être facilement modifiées :
```javascript
colors: {
  primary: { /* Bleu principal */ },
  success: { /* Vert succès */ },
  warning: { /* Orange attention */ },
  danger: { /* Rouge erreur */ }
}
```

### Thèmes
Ajoutez de nouvelles thématiques dans `src/data/mockData.json` :
```json
{
  "id": "nouveau-theme",
  "name": "Nouveau Thème",
  "color": "#couleur-hex",
  "description": "Description du thème"
}
```

## 🔮 Fonctionnalités bonus (roadmap)

### Phase 1 - Améliorations UX
- [ ] **Notifications** - Alertes pour nouveaux engagements
- [ ] **Recherche** - Barre de recherche globale
- [ ] **Favoris** - Sauvegarde de vues personnalisées
- [ ] **Partage** - URLs avec filtres pré-appliqués

### Phase 2 - Données avancées
- [ ] **Carte interactive** - Géolocalisation des missions
- [ ] **Prédictions** - IA pour prévoir l'engagement
- [ ] **Comparaisons** - Benchmarks inter-départements
- [ ] **Objectifs** - Suivi des KPI vs targets

### Phase 3 - Intégrations
- [ ] **Supabase** - Base de données cloud
- [ ] **API REST** - Endpoints pour données externes
- [ ] **SSO** - Authentification entreprise
- [ ] **Webhooks** - Synchronisation temps réel

## 🚀 Déploiement

### Vercel (recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Ou connecter votre repo GitHub à Vercel
```

### Netlify
```bash
# Build
npm run build

# Glisser-déposer le dossier dist/ sur netlify.com
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contribution

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commit** vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Ouvrir** une Pull Request

## 📝 Choix techniques

### Pourquoi React + Vite ?
- **Performance** - Hot reload ultra-rapide
- **Écosystème** - Large communauté et packages
- **Maintenabilité** - Architecture composants

### Pourquoi Tailwind CSS ?
- **Productivité** - Classes utilitaires
- **Consistance** - Design system intégré
- **Responsive** - Mobile-first par défaut

### Pourquoi Recharts ?
- **Simplicité** - API déclarative
- **Personnalisation** - Composants flexibles
- **Performance** - Optimisé pour React

### Pourquoi Context API ?
- **Simplicité** - Pas de dépendance externe
- **Performance** - Optimisations React intégrées
- **Évolutivité** - Facilement remplaçable par Redux

## 📄 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Équipe

- **Développement** - [Votre nom]
- **Design** - [Designer]
- **Product** - [Product Owner]

---

**🎯 Objectif atteint** : Dashboard RH moderne, interactif et prêt pour la production !

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue ou nous contacter.# citizen-dashboard
