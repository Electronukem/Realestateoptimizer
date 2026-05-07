import { useState } from 'react';
import './ApiKeyModal.css';

const STEPS = [
  {
    num: 1,
    title: 'Create a free RapidAPI account',
    detail: 'Go to rapidapi.com and click "Sign Up Free" in the top right corner. You can sign up with Google, GitHub, or your email address.',
    tip: 'RapidAPI is a marketplace that gives you access to thousands of data APIs including Zillow property data.',
  },
  {
    num: 2,
    title: 'Find the Zillow API',
    detail: 'Once logged in, use the search bar at the top and type "Zillow56". Click on the result called "Zillow56" — it\'s the most popular Zillow data API on the platform.',
    tip: 'You can also search for "Zillow" and look for APIs with property listings, valuations, and market data.',
  },
  {
    num: 3,
    title: 'Subscribe to the free plan',
    detail: 'On the Zillow56 API page, click the "Pricing" tab. Select the "Basic" (free) plan — it includes 500 requests per month at no cost. Click "Subscribe" to activate it.',
    tip: 'You do NOT need to enter a credit card for the free plan.',
  },
  {
    num: 4,
    title: 'Copy your API key',
    detail: 'After subscribing, click the "Endpoints" tab. On the right side of the page you\'ll see a panel labeled "Header Parameters". Your API key appears next to "X-RapidAPI-Key". Click the copy icon to copy it.',
    tip: 'Your API key is a long string of letters and numbers, like: a7f3b2c1d9e8f4a5b6c7d8e9f0a1b2c3d4e5f6a7',
  },
  {
    num: 5,
    title: 'Paste it below and save',
    detail: 'Paste your copied API key into the field below and click "Save API Key". The app will store it securely in your browser and use it for all future property searches.',
    tip: 'Your key is saved only on your computer — it never leaves your browser.',
  },
];

export function ApiKeyModal({ apiKey, onSave, onClose }) {
  const [inputValue, setInputValue] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  const handleSave = () => {
    onSave(inputValue.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClear = () => {
    setInputValue('');
    onSave('');
  };

  const maskedKey = inputValue.length > 8
    ? inputValue.slice(0, 4) + '••••••••••••••••' + inputValue.slice(-4)
    : inputValue;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">

        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-icon">🔑</div>
            <div>
              <h2>Zillow API Key Setup</h2>
              <p>Connect to live property data in 5 simple steps</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Current status banner */}
        {apiKey ? (
          <div className="status-banner status-banner--connected">
            <span className="status-dot status-dot--green" />
            <span>API key saved — app will use live Zillow data when available</span>
            <button className="status-clear" onClick={handleClear}>Remove key</button>
          </div>
        ) : (
          <div className="status-banner status-banner--demo">
            <span className="status-dot status-dot--amber" />
            <span>No API key — app is running on simulated demo data</span>
          </div>
        )}

        {/* What is this note */}
        <div className="what-is-note">
          <strong>What is a Zillow API key?</strong> It's a password-like code that lets this app
          pull real property listings, prices, and market data directly from Zillow's database.
          Without it the app works fine using simulated data — adding the key upgrades it to real data.
        </div>

        {/* Steps */}
        <div className="steps-section">
          <h3 className="steps-heading">How to get your free API key</h3>
          <div className="steps-list">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className={`step-item ${activeStep === step.num ? 'step-item--open' : ''}`}
              >
                <button
                  className="step-item-header"
                  onClick={() => setActiveStep(activeStep === step.num ? null : step.num)}
                >
                  <div className="step-num">{step.num}</div>
                  <span className="step-title">{step.title}</span>
                  <span className="step-chevron">{activeStep === step.num ? '▲' : '▼'}</span>
                </button>
                {activeStep === step.num && (
                  <div className="step-body">
                    <p className="step-detail">{step.detail}</p>
                    <div className="step-tip">
                      <span className="tip-icon">💡</span>
                      <span>{step.tip}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key input */}
        <div className="key-input-section">
          <label className="key-label">
            Your RapidAPI Key
            <span className="key-label-hint">(paste from step 4 above)</span>
          </label>
          <div className="key-input-wrap">
            <input
              className="key-input"
              type={showKey ? 'text' : 'password'}
              placeholder="Paste your API key here…"
              value={inputValue}
              onChange={(e) => { setInputValue(e.target.value); setSaved(false); }}
              spellCheck={false}
              autoComplete="off"
            />
            <button
              className="key-toggle-btn"
              onClick={() => setShowKey(v => !v)}
              title={showKey ? 'Hide key' : 'Show key'}
            >
              {showKey ? '🙈' : '👁️'}
            </button>
          </div>
          {inputValue && (
            <div className="key-preview">
              Stored as: <code>{showKey ? inputValue : maskedKey}</code>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="modal-actions">
          <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button
            className={`btn ${saved ? 'btn--saved' : 'btn--primary'}`}
            onClick={handleSave}
            disabled={!inputValue.trim()}
          >
            {saved ? '✓ Saved!' : '💾 Save API Key'}
          </button>
        </div>

        <p className="modal-fine-print">
          Your API key is stored only in your browser's local storage. It is never sent to any
          server other than RapidAPI's own servers when the app fetches property data.
        </p>

      </div>
    </div>
  );
}
