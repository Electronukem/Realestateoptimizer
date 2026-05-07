import { useState, useMemo } from 'react';
import { PropertyCard } from '../PropertyCard/PropertyCard.jsx';
import { MapView } from '../MapView/MapView.jsx';
import { ComparisonTable } from '../ComparisonTable/ComparisonTable.jsx';
import { StarRating } from '../common/StarRating.jsx';
import { exportToPdf, exportToCsv } from '../../utils/exportPdf.js';
import { formatPriceFull } from '../../utils/formatters.js';
import './ResultsPage.css';

const SORT_OPTIONS = [
  { value: 'overall', label: 'Overall Score' },
  { value: 'price_asc', label: 'Price (Low → High)' },
  { value: 'price_desc', label: 'Price (High → Low)' },
  { value: 'zoningTransition', label: 'Zoning Transition' },
  { value: 'priceValue', label: 'Price-to-Value' },
];

const PROPERTY_TYPES = [
  'Single Family Home', 'Duplex', 'Triplex', 'Fourplex / Quadplex',
  'Townhouse', 'Condo', 'Multi-Family (5+ units)', 'Land / Lot',
];

export function ResultsPage({ results, onReset }) {
  const { properties, corridor, zip, locationInfo, summary, criteria } = results;

  const [sortBy, setSortBy] = useState('overall');
  const [minRating, setMinRating] = useState(0);
  const [typeFilter, setTypeFilter] = useState([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid | map
  const [selectedId, setSelectedId] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const sorted = useMemo(() => {
    let list = [...properties];

    if (minRating > 0) list = list.filter(p => p.scores.overall >= minRating);
    if (typeFilter.length > 0) list = list.filter(p => typeFilter.includes(p.type));
    if (priceMin !== '') list = list.filter(p => p.price >= Number(priceMin));
    if (priceMax !== '') list = list.filter(p => p.price <= Number(priceMax));

    switch (sortBy) {
      case 'price_asc': list.sort((a, b) => a.price - b.price); break;
      case 'price_desc': list.sort((a, b) => b.price - a.price); break;
      case 'zoningTransition': list.sort((a, b) => b.scores.zoningTransition - a.scores.zoningTransition); break;
      case 'priceValue': list.sort((a, b) => b.scores.priceValue - a.scores.priceValue); break;
      default: list.sort((a, b) => b.scores.overall - a.scores.overall);
    }
    return list;
  }, [properties, sortBy, minRating, typeFilter, priceMin, priceMax]);

  const toggleType = (t) => setTypeFilter(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const toggleCompare = (id) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const compareProperties = useMemo(
    () => compareList.map(id => properties.find(p => p.id === id)).filter(Boolean),
    [compareList, properties]
  );

  const handleExportPdf = async () => {
    setExportLoading(true);
    await exportToPdf(sorted, criteria);
    setExportLoading(false);
  };

  return (
    <div className="results-page">
      {/* Header */}
      <div className="results-header">
        <button className="btn btn--ghost btn--sm" onClick={onReset}>← New Search</button>
        <div className="results-title">
          <h1>Investment Analysis</h1>
          <p className="results-location">
            {locationInfo?.city || 'Metro Area'}, {locationInfo?.state || 'ST'} · ZIP {zip}
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn--ghost btn--sm" onClick={() => exportToCsv(sorted)}>CSV</button>
          <button className="btn btn--ghost btn--sm" onClick={handleExportPdf} disabled={exportLoading}>
            {exportLoading ? 'Generating...' : 'PDF'}
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="results-disclaimer">
        <span>⚠</span>
        <span>Property data is simulated for demonstration purposes. In production, this would connect to MLS, county assessor, and zoning board APIs. Scoring metrics are modeled estimates, not guarantees.</span>
      </div>

      {/* Summary cards */}
      <div className="summary-strip">
        <div className="summary-card">
          <div className="summary-num">{summary.total}</div>
          <div className="summary-label">Properties Found</div>
        </div>
        <div className="summary-card">
          <div className="summary-num">{summary.highScore}</div>
          <div className="summary-label">High Score (4+★)</div>
        </div>
        <div className="summary-card">
          <div className="summary-num">{summary.avgScore.toFixed(1)}</div>
          <div className="summary-label">Avg Score</div>
        </div>
        <div className="summary-card">
          <div className="summary-num">{formatPriceFull(Math.round(properties.reduce((a, p) => a + p.price, 0) / properties.length / 1000) * 1000)}</div>
          <div className="summary-label">Avg Price</div>
        </div>
      </div>

      {/* AI summary */}
      <div className="ai-summary glass-card">
        <div className="ai-badge">
          <span className="ai-dot" />
          AI Insights
        </div>
        <p>
          Based on your criteria, we found <strong>{summary.total} properties</strong> in the {zip} area.
          The strongest investment opportunities are concentrated along the <strong>{corridor}</strong>,
          where active rezoning patterns are creating significant value gaps.{' '}
          <strong>{summary.highScore} properties</strong> scored 4+ stars overall, suggesting
          strong near-term appreciation potential given the area's development trajectory.
          The top-rated property achieved a score of <strong>{summary.topScore.toFixed(1)}/5</strong>.
        </p>
      </div>

      {/* Controls */}
      <div className="controls-bar">
        <div className="controls-left">
          <div className="view-toggle">
            <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
              ⊞ Grid
            </button>
            <button className={`view-btn ${viewMode === 'map' ? 'active' : ''}`} onClick={() => setViewMode('map')}>
              🗺 Map
            </button>
          </div>
          <button
            className={`btn btn--sm ${compareMode ? 'btn--primary' : 'btn--ghost'}`}
            onClick={() => { setCompareMode(v => !v); if (compareMode) setCompareList([]); }}
          >
            ⟺ Compare {compareMode && compareList.length > 0 ? `(${compareList.length})` : ''}
          </button>
          {compareMode && compareList.length >= 2 && (
            <button className="btn btn--sm btn--emerald" onClick={() => setShowComparison(true)}>
              View Comparison
            </button>
          )}
        </div>
        <div className="controls-right">
          <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar glass-card">
        <div className="filter-section">
          <label className="filter-label">Min Rating</label>
          <div className="rating-filter">
            {[0, 2, 3, 3.5, 4, 4.5].map(r => (
              <button key={r} className={`rating-btn ${minRating === r ? 'active' : ''}`} onClick={() => setMinRating(r)}>
                {r === 0 ? 'All' : `${r}★+`}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-section">
          <label className="filter-label">Property Type</label>
          <div className="type-filter">
            {PROPERTY_TYPES.map(t => (
              <button key={t} className={`type-filter-btn ${typeFilter.includes(t) ? 'active' : ''}`} onClick={() => toggleType(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-section filter-section--price">
          <label className="filter-label">Price Range</label>
          <div className="price-filter">
            <input type="number" placeholder="Min $" value={priceMin} onChange={e => setPriceMin(e.target.value)} />
            <span>–</span>
            <input type="number" placeholder="Max $" value={priceMax} onChange={e => setPriceMax(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="results-count">
        Showing <strong>{sorted.length}</strong> of {properties.length} properties
      </div>

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="map-section">
          <MapView
            properties={sorted}
            selectedId={selectedId}
            onSelectProperty={(id) => {
              setSelectedId(id);
              setViewMode('grid');
            }}
          />
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="property-grid">
          {sorted.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No properties match your filters</h3>
              <p>Try lowering the minimum rating or adjusting your filter criteria.</p>
            </div>
          ) : (
            sorted.map((prop, idx) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                index={idx}
                isSelected={selectedId === prop.id}
                onSelect={setSelectedId}
                compareMode={compareMode}
                isInComparison={compareList.includes(prop.id)}
                onToggleCompare={toggleCompare}
              />
            ))
          )}
        </div>
      )}

      {/* Comparison Modal */}
      {showComparison && (
        <ComparisonTable
          properties={compareProperties}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
}
