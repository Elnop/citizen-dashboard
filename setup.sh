#!/bin/bash

echo "🎯 Configuration du Dashboard RH - Engagement Citoyen"
echo "=================================================="

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dépendances installées avec succès"
else
    echo "❌ Erreur lors de l'installation des dépendances"
    exit 1
fi

# Créer le dossier public s'il n'existe pas
mkdir -p public

# Démarrer le serveur de développement
echo "🚀 Démarrage du serveur de développement..."
echo "📱 Le dashboard sera accessible sur http://localhost:3000"
echo ""
echo "🎨 Fonctionnalités disponibles:"
echo "   • 📊 Métriques d'engagement en temps réel"
echo "   • 🔍 Filtres par période, thématique et équipe"
echo "   • 📈 Graphiques interactifs (camembert, barres, ligne)"
echo "   • 🏆 Top 5 des collaborateurs les plus engagés"
echo "   • 🌙 Mode sombre/clair"
echo "   • 📥 Export CSV des données"
echo ""
echo "Pour arrêter le serveur, utilisez Ctrl+C"
echo ""

npm run dev