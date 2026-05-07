import { useState } from 'react';
import { PropertyImage } from '../common/PropertyImage.jsx';
import { StarRating } from '../common/StarRating.jsx';
import { DetailedAnalysis } from '../DetailedAnalysis/DetailedAnalysis.jsx';
import { formatPriceFull, formatSqft, formatLotSize, scoreColor } from '../../utils/formatters.js';
import './PropertyCard.css';

export function PropertyCard({ property, index, isSelected, onSelect, compareMode, isInComparison, onToggleCompare }) {
  const [analysisOpen, setAnalysisOpen] = useState(false);

  const { scores } = property;
  const overallColor = scoreColor(scores.overall);

  return (
    <div
      className={`property-card ${isSelected ? 'property-card--selected' : ''} ${isInComparison ? 'property-card--compared' : ''}`}
      onClick={() => onSelect?.(property.id)}
    >
      <div className="card-image-wrap">
        <PropertyImage colors={property.imageColors} type={property.type} index={index} />
        <div className="card-type-badge">{property.type}</div>
        {compareMode && (
          <button
            className={`compare-toggle ${isInComparison ? 'compare-toggle--active' : ''}`}
            onClick={e => { e.stopPropagation(); onToggleCompare(property.id); }}
          >
            {isInComparison ? '✓ In Compare' : '+ Compare'}
          </button>
        )}
        <div className="card-score-badge" style={{ background: `${overallColor}22`, borderColor: `${overallColor}66`, color: overallColor }}>
          ⭐ {scores.overall.toFixed(1)}
        </div>
      </div>

      <div className="card-body">
        <div className="card-price">{formatPriceFull(property.price)}</div>
        <div className="card-address">
          <span className="card-street">{property.address}</span>
          <span className="card-city">{property.city}, {property.state} {property.zip}</span>
        </div>

        <div className="card-stats">
          {property.beds > 0 && (
            <div className="stat-chip">
              <span className="stat-icon">🛏</span>
              <span>{property.beds} bd</span>
            </div>
          )}
          {property.baths > 0 && (
            <div className="stat-chip">
              <span className="stat-icon">🚿</span>
              <span>{property.baths} ba</span>
            </div>
          )}
          {property.sqft > 0 && (
            <div className="stat-chip">
              <span className="stat-icon">📐</span>
              <span>{formatSqft(property.sqft)}</span>
            </div>
          )}
          {property.lotSize > 0 && (
            <div className="stat-chip">
              <span className="stat-icon">🏞</span>
              <span>{formatLotSize(property.lotSize)}</span>
            </div>
          )}
        </div>

        <div className="card-meta">
          <span className="meta-item">Built {property.yearBuilt}</span>
          <span className="meta-dot">·</span>
          <span className="meta-item">{property.daysOnMarket}d on market</span>
          <span className="meta-dot">·</span>
          <span className="meta-item zoning-label">{property.currentZoning?.label}</span>
        </div>

        <div className="card-rating">
          <span className="rating-label">Investment Score</span>
          <StarRating score={scores.overall} size="md" animate />
        </div>

        <div className="card-mini-scores">
          {[
            { label: 'Zoning', score: scores.zoningTransition },
            { label: 'Growth', score: scores.neighborhoodGrowth },
            { label: 'Value', score: scores.priceValue },
          ].map(m => (
            <div key={m.label} className="mini-score">
              <span className="mini-label">{m.label}</span>
              <div className="mini-bar">
                <div className="mini-fill" style={{ width: `${(m.score / 5) * 100}%`, background: scoreColor(m.score) }} />
              </div>
              <span className="mini-val" style={{ color: scoreColor(m.score) }}>{m.score.toFixed(1)}</span>
            </div>
          ))}
        </div>

        <button
          className="btn-analysis"
          onClick={e => { e.stopPropagation(); setAnalysisOpen(v => !v); }}
        >
          {analysisOpen ? '▲ Hide Analysis' : '▼ View Full Analysis'}
        </button>
      </div>

      <DetailedAnalysis
        property={property}
        isOpen={analysisOpen}
        onClose={() => setAnalysisOpen(false)}
      />
    </div>
  );
}
