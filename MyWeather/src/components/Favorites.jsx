import React from 'react';

const Favorites = ({ cities, onSelectCity, onAddFavorite, onRemoveFavorite }) => {
  const handleSelect = (cityName) => {
    onSelectCity(cityName);
  };

  const handleRemove = (cityName) => {
    onRemoveFavorite(cityName);
  };

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {cities.map((city) => (
          <li key={city.name}>
            {city.name}
            <button onClick={() => handleSelect(city.name)}>View</button>
            <button onClick={() => handleRemove(city.name)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
