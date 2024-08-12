import React from 'react';

const WeatherDisplay = ({ data, units, onToggleUnits }) => {
  const temperatureUnit = units === 'metric' ? '°C' : '°F';

  return (
    <div>
      <h2>Weather in {data.name}</h2>
      <p>Temperature: {data.main.temp} {temperatureUnit}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Condition: {data.weather[0].description}</p>
      <button onClick={onToggleUnits}>
        Toggle to {units === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
};

export default WeatherDisplay;
