🌤️ Météo Tchad - Application Web Simple

Une application météo moderne développée avec HTML, CSS et JavaScript pour afficher les prévisions météorologiques des principales villes du Tchad.
🎯 Fonctionnalités

    ✅ Sélection de ville : N’Djamena, Moundou, Sarh, Abéché, Mongo
    ✅ Prévisions 7 jours : Températures min/max, conditions météo, icônes
    ✅ Interface responsive : Compatible PC et mobile
    ✅ Design moderne : Interface intuitive avec animations CSS
    ✅ Données réalistes : Simulation météo basée sur les saisons tchadiennes
    ✅ Chargement automatique : N’Djamena sélectionnée par défaut

🚀 Installation et Utilisation
Méthode 1: Ouverture directe

# Ouvrir index.html dans un navigateur web

Méthode 2: Serveur local (recommandé)

Puis ouvrir: http://localhost:8000
📁 Structure du Projet

meteo-tchad-simple/
├── index.html          # Page principale HTML
├── style.css           # Feuille de styles CSS
├── script.js           # Logique JavaScript
└── README.md           # Documentation

🛠️ Technologies Utilisées

    HTML5 : Structure sémantique et accessible
    CSS3 : Styles modernes, Grid Layout, Flexbox, animations
    JavaScript ES6+ : Logique métier, manipulation DOM, données simulées
    Design responsive : Mobile-first approach

🎨 Fonctionnalités Techniques
HTML (index.html)

    Structure sémantique avec header, main, footer
    Formulaire de sélection de ville
    Conteneurs pour les états de chargement
    Grille pour l’affichage des prévisions météo

CSS (style.css)

    Grid Layout pour la disposition responsive des cartes météo
    Flexbox pour l’alignement des éléments
    Animations CSS (fadeIn, spin, hover effects)
    Media queries pour la responsivité mobile
    Variables CSS pour la cohérence visuelle
    Gradient backgrounds pour un design moderne

JavaScript (script.js)

    Données structurées des villes tchadiennes avec coordonnées
    Simulation météo réaliste basée sur les saisons
    Gestion d’événements pour l’interactivité
    Manipulation DOM native (sans framework)
    Async/await pour les opérations asynchrones
    Notifications en temps réel pour l’utilisateur

🌍 Villes Tchadiennes Incluses
Ville 	Région 	Coordonnées 	Climat
N’Djamena 	Capitale 	12.1067°N, 15.0444°E 	Sahélien
Moundou 	Sud 	8.5667°N, 16.0833°E 	Soudanien
Sarh 	Sud-Est 	9.1500°N, 18.3833°E 	Soudanien
Abéché 	Est 	13.8292°N, 20.8324°E 	Sahélien
Mongo 	Centre 	12.1833°N, 18.6833°E 	Sahélien
🌦️ Simulation Météorologique

L’application simule des conditions météo réalistes pour le Tchad :
Saisons

    Saison sèche (Novembre-Avril) : Plus de soleil, températures élevées
    Saison des pluies (Mai-Octobre) : Plus de nuages et de précipitations

Températures

    Nord du Tchad : 25-50°C (climat désertique)
    Sud du Tchad : 22-43°C (climat tropical)

Conditions météo

    ☀️ Ciel dégagé
    ☁️ Nuageux
    🌧️ Pluie
    🌦️ Bruine
    ⛈️ Orage
    🌫️ Brume/Brouillard

🎓 Objectifs Pédagogiques

Cette application démontre :

    Développement web frontend sans frameworks
    Conception responsive et mobile-first
    Manipulation DOM avec JavaScript vanilla
    Gestion des états d’application (loading, error, success)
    Simulation d’API avec données contextualisées
    Bonnes pratiques de code et d’organisation
    Accessibilité web et sémantique HTML

🔧 Personnalisation
Ajouter une nouvelle ville

// Dans script.js, ajouter à CHAD_CITIES
nouvelleville: {
    name: "Nouvelle Ville",
    country: "TD",
    lat: 12.0000,
    lon: 15.0000
}

Modifier les conditions météo

// Personnaliser WEATHER_CONDITIONS et WEATHER_ICONS
const WEATHER_CONDITIONS = {
    'Clear': 'Votre description personnalisée'
};

Intégrer une vraie API météo

// Remplacer generateMockWeatherData() par un appel API réel
async function loadWeatherData() {
    const API_KEY = 'votre_cle_api';
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=fr`
    );
    const data = await response.json();
    // Traiter les données réelles
}

📱 Compatibilité

    ✅ Desktop : Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
    ✅ Mobile : iOS Safari 12+, Chrome Mobile 60+, Samsung Internet
    ✅ Tablette : Toutes les orientations supportées

🎯 Critères d’Évaluation Couverts
Fonctionnalités ✅

    Sélection d’une ville parmi 5 villes tchadiennes
    Prévisions météo sur 7 jours
    Données affichées de manière claire et organisée

Technique ✅

    Code HTML/CSS/JavaScript propre et bien organisé
    Simulation réaliste de données météo
    Gestion d’erreurs et d’états de chargement
    Architecture modulaire et maintenable

UI/UX & Design ✅

    Interface simple et intuitive
    Design responsive (s’adapte au mobile)
    Animations et interactions fluides
    Accessibilité et lisibilité optimisées

Présentation ✅

    Application fonctionnelle prête pour démonstration
    Documentation complète pour la prise en main
    Code commenté et explicite

📚 Ressources d’Apprentissage

    MDN Web Docs - Documentation HTML/CSS/JS
    CSS Grid Guide
    JavaScript ES6+ Features
    Responsive Web Design

📄 Licence

Projet éducatif libre d’utilisation pour l’apprentissage du développement web.
