# Dashboard RH - Engagement Citoyen

## 🎯 Objectif
Créer un dashboard React.js pour visualiser les données d'engagement citoyen d'une entreprise.

## 📋 Étapes du projet (par priorité)

### Phase 1 - Setup & Structure (Priorité 1)
- [ ] Initialiser le projet React avec Vite
- [ ] Configurer Tailwind CSS pour le design
- [ ] Installer Recharts pour les graphiques
- [ ] Créer la structure de fichiers
- [ ] Définir le dataset JSON mock

### Phase 2 - Composants de base (Priorité 1)
- [ ] Layout principal (DashboardLayout)
- [ ] Composant Header avec titre
- [ ] Composant Sidebar pour les filtres
- [ ] Composants de métriques (KPI cards)
- [ ] Structure responsive

### Phase 3 - Données & Logique (Priorité 1)
- [ ] Hook personnalisé pour la gestion des données
- [ ] Logique de filtrage (période, thématique, équipe)
- [ ] Calculs des métriques principales
- [ ] Context pour partager l'état global

### Phase 4 - Visualisations (Priorité 1)
- [ ] Graphique en camembert (répartition par thématique)
- [ ] Graphique en barres (heures par mois)
- [ ] Graphique linéaire (évolution dans le temps)
- [ ] Tableau des missions récentes

### Phase 5 - Fonctionnalités avancées (Priorité 2)
- [ ] Export CSV des données filtrées
- [ ] Mode sombre (dark mode)
- [ ] Top 5 des collaborateurs les plus engagés
- [ ] Carte interactive des missions (si géolocalisation)

### Phase 6 - Finition (Priorité 3)
- [ ] Tests unitaires
- [ ] Documentation README
- [ ] Optimisation des performances
- [ ] Déploiement (Vercel/Netlify)

## 🏗️ Structure de fichiers proposée

```
hr-engagement-dashboard/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── charts/
│   │   │   ├── EngagementPieChart.jsx
│   │   │   ├── HoursBarChart.jsx
│   │   │   ├── TrendLineChart.jsx
│   │   │   └── TopEmployeesChart.jsx
│   │   ├── filters/
│   │   │   ├── DateFilter.jsx
│   │   │   ├── ThemeFilter.jsx
│   │   │   └── TeamFilter.jsx
│   │   ├── metrics/
│   │   │   ├── MetricCard.jsx
│   │   │   └── MetricsGrid.jsx
│   │   └── common/
│   │       ├── LoadingSpinner.jsx
│   │       └── ExportButton.jsx
│   ├── hooks/
│   │   ├── useEngagementData.js
│   │   ├── useFilters.js
│   │   └── useDarkMode.js
│   ├── context/
│   │   └── DashboardContext.jsx
│   ├── data/
│   │   ├── mockData.json
│   │   └── dataUtils.js
│   ├── utils/
│   │   ├── dateUtils.js
│   │   ├── exportUtils.js
│   │   └── calculations.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🛠️ Stack technique
- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **State**: React Context + useState/useReducer
- **Data**: JSON mock (évolutif vers Supabase)