import { useEffect, useRef } from 'react';
import { ZIP_CITY_MAP } from '../../data/mockData.js';

function getCoords(location) {
  const zip = location.match(/\b(\d{5})\b/)?.[1];
  if (zip && ZIP_CITY_MAP[zip]) return ZIP_CITY_MAP[zip];
  return ZIP_CITY_MAP.default;
}

export function MapPreview({ location }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    let map;
    let L;
    const init = async () => {
      if (!containerRef.current) return;
      L = (await import('leaflet')).default;
      const coords = getCoords(location);
      if (mapRef.current) {
        mapRef.current.setView([coords.lat, coords.lng], 13);
        return;
      }
      map = L.map(containerRef.current, { zoomControl: true, scrollWheelZoom: false }).setView([coords.lat, coords.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);
      L.circleMarker([coords.lat, coords.lng], {
        radius: 8, color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.7, weight: 2,
      }).addTo(map);
      mapRef.current = map;
    };
    init();
    return () => {
      if (mapRef.current && !mapRef.current._container) return;
    };
  }, [location]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
