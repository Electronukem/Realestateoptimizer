import { StarRating } from '../common/StarRating.jsx';
import { PropertyImage } from '../common/PropertyImage.jsx';
import { formatPriceFull, formatSqft, formatLotSize, scoreColor } from '../../utils/formatters.js';
import './ComparisonTable.css';

const SCORE_METRICS = [
  { key: 'overall', label: 'Overall Score' },
  { key: 'zoningTransition', label: 'Zoning Transition' },
  { key: 'neighborhoodGrowth', label: 'Neighborhood Growth' },
  { key: 'votingPolicy', label: 'Voting & Policy' },
  { key: 'priceValue', label: 'Price-to-Value' },
  { key: 'infrastructure', label: 'Infrastructure' },
  { key: 'rentalIncome', label: 'Rental Income' },
];

const INFO_ROWS = [
  { label: 'Price', fn: p => formatPriceFull(p.price) },
  { label: 'Type', fn: p => p.type },
  { label: 'Beds / Baths', fn: p => p.beds > 0 ? `${p.beds} bd / ${p.baths} ba` : 'N/A' },
  { label: 'Sq Footage', fn: p => formatSqft(p.sqft) },
  { label: 'Lot Size', fn: p => formatLotSize(p.lotSize) },
  { label: 'Year Built', fn: p => p.yearBuilt || 'N/A' },
  { label: 'Price/Sqft', fn: p => p.pricePerSqft ? `$${p.pricePerSqft}` : 'N/A' },
  { label: 'Days on Market', fn: p => `${p.daysOnMarket} days` },
  { label: 'Zoning', fn: p => p.currentZoning?.label || 'N/A' },
];

export function ComparisonTable({ properties, onClose }) {
  if (!properties || properties.length < 2) return null;

  const getBest = (key) => {
    let best = -Infinity;
    properties.forEach(p => { if (p.scores[key] > best) best = p.scores[key]; });
    return best;
  };

  return (
    <div className="comparison-overlay">
      <div className="comparison-modal glass-card">
        <div className="comparison-header">
          <div>
            <h2>Side-by-Side Comparison</h2>
            <p>{properties.length} properties selected</p>
          </div>
          <button className="btn-close" onClick={onClose}>✕ Close</button>
        </div>

        <div className="comparison-scroll">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="label-col">Attribute</th>
                {properties.map((p, idx) => (
                  <th key={p.id}>
                    <div className="comp-header-cell">
                      <PropertyImage colors={p.imageColors} type={p.type} index={idx} />
                      <div className="comp-header-info">
                        <div className="comp-price">{formatPriceFull(p.price)}</div>
                        <div className="comp-addr">{p.address}</div>
                        <div className="comp-city">{p.city}, {p.state}</div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Property info rows */}
              {INFO_ROWS.map(row => (
                <tr key={row.label} className="info-row">
                  <td className="row-label">{row.label}</td>
                  {properties.map(p => (
                    <td key={p.id} className="row-value">{row.fn(p)}</td>
                  ))}
                </tr>
              ))}

              {/* Divider */}
              <tr className="section-divider">
                <td colSpan={properties.length + 1}>📊 Investment Scores</td>
              </tr>

              {/* Score rows */}
              {SCORE_METRICS.map(metric => {
                const best = getBest(metric.key);
                return (
                  <tr key={metric.key} className="score-row">
                    <td className="row-label">{metric.label}</td>
                    {properties.map(p => {
                      const score = p.scores[metric.key];
                      const isBest = score === best;
                      return (
                        <td key={p.id} className={`score-cell ${isBest ? 'score-cell--best' : ''}`}>
                          <div className="score-cell-inner">
                            <StarRating score={score} size="sm" animate />
                            <span style={{ color: scoreColor(score), fontSize: '0.8rem', fontWeight: 700 }}>
                              {score.toFixed(1)}
                            </span>
                            {isBest && <span className="best-badge">Best</span>}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
