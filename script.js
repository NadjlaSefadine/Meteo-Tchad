// Configuration des villes tchadiennes
const CHAD_CITIES = {
    ndjamena: {
        name: "N'Djamena",
        country: "TD",
        lat: 12.1067,
        lon: 15.0444
    },
    moundou: {
        name: "Moundou",
        country: "TD",
        lat: 8.5667,
        lon: 16.0833
    },
    sarh: {
        name: "Sarh",
        country: "TD",
        lat: 9.1500,
        lon: 18.3833
    },
    abeche: {
        name: "Abéché",
        country: "TD",
        lat: 13.8292,
        lon: 20.8324
    },
    mongo: {
        name: "Mongo",
        country: "TD",
        lat: 12.1833,
        lon: 18.6833
    }
};

// Icônes météo
const WEATHER_ICONS = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️',
    'Dust': '🌪️',
    'Sand': '🌪️'
};

// Conditions météo en français
const WEATHER_CONDITIONS = {
    'Clear': 'Ciel dégagé',
    'Clouds': 'Nuageux',
    'Rain': 'Pluie',
    'Drizzle': 'Bruine',
    'Thunderstorm': 'Orage',
    'Snow': 'Neige',
    'Mist': 'Brume',
    'Fog': 'Brouillard',
    'Haze': 'Brume de chaleur',
    'Dust': 'Poussière',
    'Sand': 'Tempête de sable'
};

// Jours de la semaine en français
const DAYS_FR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

// Variables globales
let currentCity = null;

// Éléments DOM
let citySelect, refreshBtn, loading, weatherContainer, noData, cityName, forecastGrid;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les éléments DOM
    citySelect = document.getElementById('citySelect');
    refreshBtn = document.getElementById('refreshBtn');
    loading = document.getElementById('loading');
    weatherContainer = document.getElementById('weatherContainer');
    noData = document.getElementById('noData');
    cityName = document.getElementById('cityName');
    forecastGrid = document.getElementById('forecastGrid');
    
    // Événements
    citySelect.addEventListener('change', handleCityChange);
    refreshBtn.addEventListener('click', handleRefresh);
    
    // Charger N'Djamena par défaut après un petit délai
    setTimeout(() => {
        citySelect.value = 'ndjamena';
        handleCityChange();
    }, 500);
});

// Gestionnaire de changement de ville
async function handleCityChange() {
    const selectedCityKey = citySelect.value;
    
    if (!selectedCityKey) {
        showNoData();
        refreshBtn.disabled = true;
        return;
    }
    
    currentCity = CHAD_CITIES[selectedCityKey];
    refreshBtn.disabled = false;
    
    await loadWeatherData();
}

// Gestionnaire de rafraîchissement
async function handleRefresh() {
    if (currentCity) {
        await loadWeatherData();
    }
}

// Charger les données météo
async function loadWeatherData() {
    if (!currentCity) return;
    
    showLoading();
    refreshBtn.classList.add('loading');
    
    try {
        // Simuler un délai d'API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const weatherData = generateMockWeatherData(currentCity);
        displayWeatherData(weatherData);
        showSuccess(`Prévisions chargées pour ${currentCity.name}`);
        
    } catch (error) {
        console.error('Erreur lors du chargement des données météo:', error);
        showError('Erreur lors du chargement des données météo');
        showNoData();
    } finally {
        hideLoading();
        refreshBtn.classList.remove('loading');
    }
}

// Générer des données météo factices
function generateMockWeatherData(city) {
    const forecast = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        // Conditions météo variées selon la saison et la région
        const conditions = ['Clear', 'Clouds', 'Rain'];
        const weights = getSeasonalWeights(date.getMonth(), city.lat);
        const condition = getWeightedRandom(conditions, weights);
        
        // Températures réalistes pour le Tchad
        const baseTemp = getBaseTemperature(date.getMonth(), city.lat);
        const tempVariation = Math.random() * 10 - 5;
        
        const dayWeather = {
            dt: Math.floor(date.getTime() / 1000),
            temp: {
                min: Math.round(baseTemp + tempVariation),
                max: Math.round(baseTemp + tempVariation + Math.random() * 15 + 5)
            },
            weather: [{
                main: condition,
                description: WEATHER_CONDITIONS[condition],
                icon: WEATHER_ICONS[condition]
            }],
            humidity: Math.floor(Math.random() * 40) + 30,
            wind_speed: Math.floor(Math.random() * 15) + 5
        };
        
        forecast.push(dayWeather);
    }
    
    return {
        city: city,
        daily: forecast
    };
}

// Obtenir les poids saisonniers pour les conditions météo
function getSeasonalWeights(month, latitude) {
    // Saison sèche (Nov-Avr) vs saison des pluies (Mai-Oct)
    const isDrySeason = month >= 10 || month <= 3;
    
    if (isDrySeason) {
        return [0.7, 0.25, 0.05]; // Plus de soleil, moins de pluie
    } else {
        return [0.4, 0.35, 0.25]; // Plus de nuages et de pluie
    }
}

// Sélection pondérée aléatoire
function getWeightedRandom(items, weights) {
    const random = Math.random();
    let weightSum = 0;
    
    for (let i = 0; i < items.length; i++) {
        weightSum += weights[i];
        if (random <= weightSum) {
            return items[i];
        }
    }
    
    return items[0];
}

// Obtenir la température de base selon la saison et la latitude
function getBaseTemperature(month, latitude) {
    // Températures moyennes pour le Tchad selon la région et la saison
    const isNorthern = latitude > 12; // Nord du Tchad (plus chaud et sec)
    const isCoolSeason = month >= 11 || month <= 2; // Saison fraîche
    
    let baseTemp;
    
    if (isNorthern) {
        baseTemp = isCoolSeason ? 25 : 35; // Nord: 25-40°C vs 35-50°C
    } else {
        baseTemp = isCoolSeason ? 22 : 28; // Sud: 22-37°C vs 28-43°C
    }
    
    return baseTemp;
}

// Afficher les données météo
function displayWeatherData(weatherData) {
    if (!weatherData || !weatherData.daily) return;
    
    cityName.textContent = `Prévisions pour ${weatherData.city.name}`;
    forecastGrid.innerHTML = '';
    
    weatherData.daily.forEach((day, index) => {
        const card = createWeatherCard(day, index === 0);
        forecastGrid.appendChild(card);
    });
    
    showWeatherContainer();
}

// Créer une carte météo
function createWeatherCard(dayWeather, isToday) {
    const card = document.createElement('div');
    card.className = `weather-card ${isToday ? 'today' : ''}`;
    
    const date = new Date(dayWeather.dt * 1000);
    const dateStr = isToday ? "Aujourd'hui" : formatDate(date);
    
    card.innerHTML = `
        <div class="card-date">${dateStr}</div>
        <div class="weather-icon">${dayWeather.weather[0].icon}</div>
        <div class="weather-description">${dayWeather.weather[0].description}</div>
        <div class="temperature-range">
            <div class="temp-min">
                <div class="temp-label">Min</div>
                <div class="temp-value">${dayWeather.temp.min}°</div>
            </div>
            <div class="temp-max">
                <div class="temp-label">Max</div>
                <div class="temp-value">${dayWeather.temp.max}°</div>
            </div>
        </div>
        <div class="weather-details">
            <span>💧 ${dayWeather.humidity}%</span>
            <span>💨 ${dayWeather.wind_speed} km/h</span>
        </div>
    `;
    
    return card;
}

// Formater la date
function formatDate(date) {
    const day = DAYS_FR[date.getDay()];
    const dayNum = date.getDate();
    const month = MONTHS_FR[date.getMonth()];
    
    return `${day} ${dayNum}`;
}

// Fonctions d'affichage des états
function showLoading() {
    if (loading) loading.classList.remove('hidden');
    if (weatherContainer) weatherContainer.classList.add('hidden');
    if (noData) noData.classList.add('hidden');
}

function hideLoading() {
    if (loading) loading.classList.add('hidden');
}

function showWeatherContainer() {
    if (weatherContainer) weatherContainer.classList.remove('hidden');
    if (noData) noData.classList.add('hidden');
}

function showNoData() {
    if (weatherContainer) weatherContainer.classList.add('hidden');
    if (noData) noData.classList.remove('hidden');
}

// Notifications simples
function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Créer une nouvelle notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}