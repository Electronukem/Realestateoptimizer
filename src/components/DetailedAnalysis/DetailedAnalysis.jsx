import { useEffect, useRef } from 'react';
import { StarRating } from '../common/StarRating.jsx';
import { scoreColor } from '../../utils/formatters.js';
import './DetailedAnalysis.css';

const METRICS = [
  { key: 'zoningTransition', label: 'Zoning Transition Potential', icon: '🏗️', expKey: 'zoningTransition' },
  { key: 'neighborhoodGrowth', label: 'Neighborhood Growth Trajectory', icon: '📈', expKey: 'neighborhoodGrowth' },
  { key: 'votingPolicy', label: 'Voting & Policy Alignment', icon: '🗳️', expKey: 'votingPolicy' },
  { key: 'priceValue', label: 'Price-to-Value Ratio', icon: '💎', expKey: 'priceValue' },
  { key: 'infrastructure', label: 'Infrastructure & Amenity Pipeline', icon: '🚇', expKey: 'infrastructure' },
  { key: 'rentalIncome', label: 'Rental Income Potential', icon: '🏦', expKey: 'rentalIncome' },
];

export function DetailedAnalysis({ property, isOpen, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen) panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [isOpen]);

  if (!isOpen || !property) return null;

  return (
    <div className="analysis-panel" ref={panelRef}>
      <div className="analysis-header">
        <div className="analysis-title">
          <span className="analysis-icon">🔬</span>
          <div>
            <h3>Investment Analysis</h3>
            <p>{property.fullAddress}</p>
          </div>
        </div>
        <button className="analysis-close" onClick={onClose}>✕</button>
      </div>

      <div className="analysis-overall">
        <div className="overall-score-block">
          <div className="overall-label">Overall Investment Score</div>
          <div className="overall-stars">
            <StarRating score={property.scores.overall} size="xl" animate showNumber />
          </div>
          <div className="overall-bar">
            <div
              className="overall-fill"
              style={{
                width: `${(property.scores.overall / 5) * 100}%`,
                background: `linear-gradient(90deg, var(--color-blue), ${scoreColor(property.scores.overall)})`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="metrics-list">
        {METRICS.map((metric, idx) => {
          const score = property.scores[metric.key];
          const explanation = property.explanations[metric.expKey];
          return (
            <div key={metric.key} className="metric-row" style={{ animationDelay: `${idx * 0.08}s` }}>
              <div className="metric-header">
                <div className="metric-meta">
                  <span className="metric-icon">{metric.icon}</span>
                  <div>
                    <div className="metric-label">{metric.label}</div>
                    <StarRating score={score} size="sm" animate showNumber />
                  </div>
                </div>
                <div className="metric-bar-wrap">
                  <div className="metric-bar">
                    <div
                      className="metric-bar-fill"
                      style={{
                        width: `${(score / 5) * 100}%`,
                        background: `linear-gradient(90deg, ${scoreColor(score)}, ${scoreColor(score)}88)`,
                        animationDelay: `${idx * 0.12 + 0.2}s`,
                      }}
                    />
                  </div>
                  <span className="metric-score-val" style={{ color: scoreColor(score) }}>
                    {score.toFixed(1)}/5
                  </span>
                </div>
              </div>
              <p className="metric-explanation">{explanation}</p>
            </div>
          );
        })}
      </div>

      <div className="analysis-footer">
        <div className="analysis-disclaimer">
          ⚠ Scores are modeled estimates based on simulated data. Not financial advice.
        </div>
      </div>
    </div>
  );
}
