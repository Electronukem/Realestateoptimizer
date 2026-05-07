import { useState } from 'react';
import { RangeSlider } from '../common/RangeSlider.jsx';
import { MapPreview } from '../MapView/MapPreview.jsx';
import './InputForm.css';

const PROPERTY_TYPES = [
  'Single Family Home', 'Duplex', 'Triplex', 'Fourplex / Quadplex',
  'Townhouse', 'Condo', 'Multi-Family (5+ units)', 'Land / Lot',
];

const HORIZON_OPTIONS = [
  { value: '1', label: '1 year', desc: 'Short flip' },
  { value: '3', label: '3 years', desc: 'Near-term hold' },
  { value: '5', label: '5 years', desc: 'Medium hold' },
  { value: '10', label: '10 years', desc: 'Long-term' },
  { value: '15', label: '15 years', desc: 'Extended hold' },
  { value: '20', label: '20+ years', desc: 'Legacy investment' },
];

export function InputForm({ onSubmit, onOpenHelp }) {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState({ min: 100000, max: 800000 });
  const [propertyTypes, setPropertyTypes] = useState(['Single Family Home', 'Duplex']);
  const [investmentHorizon, setInvestmentHorizon] = useState('5');

  const toggleType = (type) => {
    setPropertyTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ location, budget, propertyTypes, investmentHorizon });
  };

  const canProceed1 = location.trim().length >= 3;
  const canProceed2 = true;
  const canSubmit = propertyTypes.length > 0;

  return (
    <div className="input-form-wrapper">
      <div className="input-form-hero">
        <div className="hero-badge">AI-Powered Analysis</div>
        <h1 className="hero-title">
          Find Your Next
          <span className="hero-gradient"> Undervalued</span>
          <br />Property
        </h1>
        <p className="hero-subtitle">
          Discover properties near zoning transition zones before the market catches up.
          Powered by real estate data modeling and predictive analytics.
        </p>
        <button className="hero-help-btn" onClick={onOpenHelp}>
          <span>📖</span> New here? Read the quick-start guide
        </button>
      </div>

      <form className="input-form glass-card" onSubmit={handleSubmit}>
        {/* Step indicators */}
        <div className="step-indicators">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`step-indicator ${step >= s ? 'active' : ''} ${step > s ? 'done' : ''}`} onClick={() => s < step && setStep(s)}>
              <div className="step-dot">{step > s ? '✓' : s}</div>
              <span className="step-label">
                {s === 1 ? 'Location' : s === 2 ? 'Budget' : s === 3 ? 'Type' : 'Horizon'}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Location */}
        {step === 1 && (
          <div className="form-step">
            <div className="step-header">
              <div className="step-icon">📍</div>
              <div>
                <h2>Where are you looking?</h2>
                <p>Enter a city, ZIP code, or neighborhood to begin your search.</p>
              </div>
            </div>
            <div className="field-group">
              <label>Location</label>
              <input
                className="text-input"
                type="text"
                placeholder="e.g. 30312, Atlanta GA, Eastside Denver..."
                value={location}
                onChange={e => setLocation(e.target.value)}
                autoFocus
              />
              <span className="field-hint">Try a ZIP code for best results (e.g. 30312, 77001, 60601)</span>
            </div>
            {location.trim().length >= 3 && (
              <div className="map-preview-container">
                <MapPreview location={location} />
              </div>
            )}
            <div className="step-nav">
              <button type="button" className="btn btn--primary" disabled={!canProceed1} onClick={() => setStep(2)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Budget */}
        {step === 2 && (
          <div className="form-step">
            <div className="step-header">
              <div className="step-icon">💰</div>
              <div>
                <h2>What's your budget?</h2>
                <p>Set your price range. Drag the sliders or enter values directly.</p>
              </div>
            </div>
            <div className="field-group">
              <label>Price Range</label>
              <RangeSlider
                min={50000}
                max={3000000}
                step={5000}
                value={budget}
                onChange={setBudget}
              />
            </div>
            <div className="budget-summary glass-inset">
              <div className="budget-stat">
                <span>Min</span>
                <strong>${budget.min.toLocaleString()}</strong>
              </div>
              <div className="budget-divider" />
              <div className="budget-stat">
                <span>Max</span>
                <strong>${budget.max.toLocaleString()}</strong>
              </div>
              <div className="budget-divider" />
              <div className="budget-stat">
                <span>Range</span>
                <strong>${(budget.max - budget.min).toLocaleString()}</strong>
              </div>
            </div>
            <div className="step-nav">
              <button type="button" className="btn btn--ghost" onClick={() => setStep(1)}>← Back</button>
              <button type="button" className="btn btn--primary" disabled={!canProceed2} onClick={() => setStep(3)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Property Type */}
        {step === 3 && (
          <div className="form-step">
            <div className="step-header">
              <div className="step-icon">🏘️</div>
              <div>
                <h2>What types of property?</h2>
                <p>Select all that apply. We'll filter results to match your preferences.</p>
              </div>
            </div>
            <div className="type-grid">
              {PROPERTY_TYPES.map(type => (
                <button
                  key={type}
                  type="button"
                  className={`type-chip ${propertyTypes.includes(type) ? 'selected' : ''}`}
                  onClick={() => toggleType(type)}
                >
                  <span className="type-check">{propertyTypes.includes(type) ? '✓' : ''}</span>
                  {type}
                </button>
              ))}
            </div>
            {propertyTypes.length === 0 && (
              <p className="field-hint field-hint--warn">Please select at least one property type.</p>
            )}
            <div className="step-nav">
              <button type="button" className="btn btn--ghost" onClick={() => setStep(2)}>← Back</button>
              <button type="button" className="btn btn--primary" disabled={!canSubmit} onClick={() => setStep(4)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Investment Horizon */}
        {step === 4 && (
          <div className="form-step">
            <div className="step-header">
              <div className="step-icon">📅</div>
              <div>
                <h2>Investment horizon</h2>
                <p>How long do you plan to hold the property?</p>
              </div>
            </div>
            <div className="horizon-grid">
              {HORIZON_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`horizon-chip ${investmentHorizon === opt.value ? 'selected' : ''}`}
                  onClick={() => setInvestmentHorizon(opt.value)}
                >
                  <span className="horizon-value">{opt.label}</span>
                  <span className="horizon-desc">{opt.desc}</span>
                </button>
              ))}
            </div>

            <div className="criteria-summary glass-inset">
              <h4>Summary</h4>
              <div className="summary-grid">
                <div><span>Location</span><strong>{location}</strong></div>
                <div><span>Budget</span><strong>${(budget.min / 1000).toFixed(0)}K – ${(budget.max / 1000).toFixed(0)}K</strong></div>
                <div><span>Types</span><strong>{propertyTypes.length} selected</strong></div>
                <div><span>Hold period</span><strong>{investmentHorizon} years</strong></div>
              </div>
            </div>

            <div className="step-nav">
              <button type="button" className="btn btn--ghost" onClick={() => setStep(3)}>← Back</button>
              <button type="submit" className="btn btn--cta btn--large">
                <span className="btn-icon">🔍</span>
                Analyze Properties
              </button>
            </div>
          </div>
        )}
      </form>

      <div className="disclaimer-banner">
        <span className="disclaimer-icon">⚠</span>
        All property data is simulated for demonstration. In production, this connects to MLS, county assessor, and zoning board APIs.
      </div>
    </div>
  );
}
