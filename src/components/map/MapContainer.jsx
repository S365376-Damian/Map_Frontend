import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
};

const MapView = ({ 
  center, //hiện 1 tọa độ thành phố darwin trung tâm
  zoom, // zoom of the map
  markers = [], //point to set up show on the map, the alert.
  route = null, //
  onMarkerClick //click to alert showing information
}) => {
  const getIcon = (type) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-color: ${getColor(type)};
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 2px solid white;
      "></div>`,
      iconSize: [25, 25]
    });
  };

  const getColor = (type) => {
    const colors = {
      stairs: 'red',
      damaged_path: 'orange',
      missing_traffic_light: 'yellow',
      obstacle: 'purple',
      no_ramp: 'brown',
      other: 'gray'
    };
    return colors[type] || 'gray';
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapUpdater center={center} zoom={zoom} />
      
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.latitude, marker.longitude]}
          icon={getIcon(marker.type)}
          eventHandlers={{
            click: () => onMarkerClick && onMarkerClick(marker)
          }}
        >
          <Popup>
            <div>
              <strong>{marker.name}</strong>
              <p>{marker.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;

