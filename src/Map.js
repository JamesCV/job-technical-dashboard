import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet CSS is imported
import './Map.css';
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function Map({ data }) {
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div className="map-container">
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '878px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((row, index) => (
          <Marker
            key={index}
            position={[row.LATITUDE, row.LONGITUDE]}
          >
            <Popup>
              Temp Problem: {index} <br/>
              Score: {row.SCORE} <br/>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
