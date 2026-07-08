import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './bikeMap.module.css';

export default function BikeMap() {
  const [routes, setRoutes] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState(null);

  // Имитация загрузки GeoJSON данных (замените своим URL или импортом)
  useEffect(() => {
    // fetch('/path-to-your-routes.geojson')
    //   .then(res => res.json())
    //   .then(data => { setRoutes(data); setFilteredRoutes(data); });
    
    // Временный стаб для структуры
    const mockGeoJSON = {
      type: "FeatureCollection",
      features: []
    };
    setRoutes(mockGeoJSON);
    setFilteredRoutes(mockGeoJSON);
  }, []);

  // Хэндлер поиска по названию маршрута в свойствах GeoJSON (properties.name)
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!routes) return;

    const filtered = {
      ...routes,
      features: routes.features.filter(feature => 
        feature.properties?.name?.toLowerCase().includes(query)
      )
    };
    setFilteredRoutes(filtered);
  };

  // Стилизация линий маршрута
  const routeStyle = {
    color: '#ff4500',
    weight: 4,
    opacity: 0.8
  };

  return (
    <div className={styles.mapWrapper}>
      {/* Контейнер поиска поверх карты */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Поиск веломаршрута..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      {/* Карта Leaflet */}
      <MapContainer 
        center={[55.7558, 37.6173]} 
        zoom={10} 
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {filteredRoutes && (
          <GeoJSON 
            key={JSON.stringify(filteredRoutes)} // Перерисовывает слой при изменении фильтра
            data={filteredRoutes} 
            style={routeStyle}
            onEachFeature={(feature, layer) => {
              if (feature.properties?.name) {
                layer.bindPopup(`<b>${feature.properties.name}</b>`);
              }
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
