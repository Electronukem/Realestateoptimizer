import { useEffect, useRef, useState } from 'react';
import { pinColor } from '../../utils/formatters.js';
import './MapView.css';

export function MapView({ properties, onSelectProperty, selectedId }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let ignore = false;
    const init = async () => {
      if (!containerRef.current || mapRef.current) return;
      const L = (await import('leaflet')).default;
      if (ignore || !containerRef.current) return;

      const center = properties.length > 0
        ? [properties[0].lat, properties[0].lng]
        : [33.749, -84.388];

      const map = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
      }).setView(center, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;

      properties.forEach((prop) => {
        const color = pinColor(prop.scores?.overall || 0);
        const marker = L.circleMarker([prop.lat, prop.lng], {
          radius: 10,
          color: 'white',
          fillColor: color,
          fillOpacity: 0.85,
          weight: 2,
        });

        const popupHtml = `
          <div class="map-popup">
            <div class="map-popup__price">$${prop.price.toLocaleString()}</div>
            <div class="map-popup__address">${prop.address}</div>
            <div class="map-popup__type">${prop.type}</div>
            <div class="map-popup__score">⭐ ${(prop.scores?.overall || 0).toFixed(1)}/5</div>
          </div>
        `;
        marker.bindPopup(popupHtml, { className: 'custom-popup', maxWidth: 200 });
        marker.on('click', () => onSelectProperty?.(prop.id));
        marker.addTo(map);
        markersRef.current.push({ id: prop.id, marker });
      });

      setReady(true);
    };
    init();
    return () => { ignore = true; };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    markersRef.current.forEach(({ id, marker }) => {
      const isSelected = id === selectedId;
      marker.setStyle({
        radius: isSelected ? 14 : 10,
        weight: isSelected ? 3 : 2,
        color: isSelected ? '#fff' : 'rgba(255,255,255,0.6)',
      });
    });
  }, [selectedId]);

  return (
    <div className="map-view">
      <div className="map-legend">
        <div className="legend-item"><span className="legend-dot" style={{ background: '#10b981' }} />High (4+)</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: '#f59e0b' }} />Medium (3-4)</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }} />Low (&lt;3)</div>
      </div>
      <div ref={containerRef} className="map-container" />
      {!ready && <div className="map-loading">Loading map...</div>}
    </div>
  );
}
