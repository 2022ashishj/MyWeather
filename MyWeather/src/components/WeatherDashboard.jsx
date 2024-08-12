import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import Favorites from './Favorites';
import './Dashboard.css';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [units, setUnits] = useState('metric'); 

  useEffect(() => {
    
    axios.get('http://localhost:3001/favorites').then((response) => {
      setFavorites(response.data);
    });

    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      fetchWeatherData(lastCity);
    }
  }, []);

  const fetchWeatherData = (cityName) => {
    const API_KEY = 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${API_KEY}`;
    
    axios.get(url).then((response) => {
      setWeatherData(response.data);
      setCity(cityName);
      localStorage.setItem('lastCity', cityName); 
    }).catch((error) => {
      console.error('Error fetching weather data:', error);
    });
  };

  const addFavorite = (cityName) => {
    const newFavorite = { name: cityName };
    axios.post('http://localhost:3001/favorites', newFavorite).then(() => {
      setFavorites([...favorites, newFavorite]);
    });
  };

  const removeFavorite = (cityName) => {
    axios.delete(`http://localhost:3001/favorites/${cityName}`).then(() => {
      setFavorites(favorites.filter((city) => city.name !== cityName));
    });
  };

  const toggleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <Search onSearch={fetchWeatherData} />
      {weatherData && (
        <WeatherDisplay
          data={weatherData}
          units={units}
          onToggleUnits={toggleUnits}
        />
      )}
      <Favorites
        cities={favorites}
        onSelectCity={fetchWeatherData}
        onAddFavorite={addFavorite}
        onRemoveFavorite={removeFavorite}
      />
    </div>
  );
};

export default WeatherDashboard;
