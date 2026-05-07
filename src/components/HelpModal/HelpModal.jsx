import './HelpModal.css';

const USAGE_STEPS = [
  {
    num: '01',
    icon: '📍',
    title: 'Enter a location',
    content: 'Type a ZIP code (e.g. 30312), city name, or neighborhood. ZIP codes give the most accurate results. A small map will appear showing the area you selected.',
    example: 'Try: 30312   or   Austin TX   or   60601',
  },
  {
    num: '02',
    icon: '💰',
    title: 'Set your budget',
    content: 'Drag the two handles on the slider to set your minimum and maximum property price. You can also type exact numbers in the boxes below the slider.',
    example: 'Example: $150,000 minimum — $600,000 maximum',
  },
  {
    num: '03',
    icon: '🏘️',
    title: 'Choose property types',
    content: 'Click to select the kinds of properties you\'re interested in. You can pick multiple types. Highlighted chips (blue) are selected.',
    example: 'Example: Select "Single Family Home" and "Duplex"',
  },
  {
    num: '04',
    icon: '📅',
    title: 'Pick your hold period',
    content: 'Choose how long you plan to own the property before selling. Longer holds (10+ years) allow more time for zoning transitions to increase property value.',
    example: 'New investors often start with 5 years',
  },
  {
    num: '05',
    icon: '🔍',
    title: 'Click "Analyze Properties"',
    content: 'The app will generate a list of properties in your area and score each one across 6 investment metrics. This takes about 2–3 seconds.',
    example: 'You\'ll see a progress bar while it works',
  },
  {
    num: '06',
    icon: '⭐',
    title: 'Read the results',
    content: 'Each property card shows a star rating (1–5 stars). Higher stars = stronger investment potential. The summary at the top highlights the best opportunities in the area.',
    example: '4+ stars = excellent opportunity, 2 or below = skip it',
  },
  {
    num: '07',
    icon: '🔬',
    title: 'Click "View Full Analysis"',
    content: 'On any property card, click this button to expand a detailed breakdown of all 6 scoring metrics with written explanations of why each score was given.',
    example: 'Look for high "Zoning Transition" scores — that\'s the core thesis',
  },
  {
    num: '08',
    icon: '🗺️',
    title: 'Switch to Map View',
    content: 'Click the "Map" button in the results toolbar to see all properties plotted on a map. Green pins are high-scoring, yellow are medium, red are low. Click any pin for a quick summary.',
    example: 'Map view helps you see which neighborhoods cluster well',
  },
  {
    num: '09',
    icon: '⟺',
    title: 'Compare properties side-by-side',
    content: 'Click "Compare" in the toolbar, then click "+ Compare" on up to 3 property cards. Click "View Comparison" to open a detailed side-by-side table showing every metric.',
    example: 'Useful when you\'ve narrowed down to 2–3 finalists',
  },
  {
    num: '10',
    icon: '📥',
    title: 'Export your results',
    content: 'Click "PDF" to download a formatted report of all your results. Click "CSV" to download a spreadsheet you can open in Excel or Google Sheets.',
    example: 'PDFs are good for sharing; CSVs are good for your own analysis',
  },
];

const FAQ = [
  {
    q: 'Is this real property data?',
    a: 'By default, no — the app generates realistic-looking simulated data so you can explore all its features immediately. When you add a Zillow API key (via the 🔑 button in the menu bar), the app can connect to real property listings.',
  },
  {
    q: 'What is a "zoning transition"?',
    a: 'Zoning laws decide what can be built on a piece of land. When an area gets "rezoned" from single-family homes to mixed-use or multi-family, property values in nearby areas often rise significantly. This app finds properties near areas likely to undergo that change.',
  },
  {
    q: 'Are the star scores a guarantee?',
    a: 'No. Scores are estimates based on modeled data. They are meant to help prioritize which properties to research further — not to replace due diligence, a real estate agent, or a financial advisor.',
  },
  {
    q: 'Do I need the Zillow API key?',
    a: 'No. The app works fully without it using simulated data. The API key is optional and would enable real listing data in a production version of this tool.',
  },
  {
    q: 'How do I start a new search?',
    a: 'Click "New Search" in the top right of the menu bar, or click the house icon / "Real Estate Optimizer" logo on the left side of the menu bar.',
  },
];

export function HelpModal({ onClose, onOpenApiKey }) {
  return (
    <div className="help-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="help-box">

        <div className="help-header">
          <div className="help-header-left">
            <div className="help-header-icon">📖</div>
            <div>
              <h2>How to Use Real Estate Optimizer</h2>
              <p>A complete beginner's guide — no experience needed</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Intro callout */}
        <div className="help-intro">
          <strong>What does this app do?</strong> It helps you find real estate properties that
          are likely to increase in value because they sit near areas where local governments
          are changing zoning rules — which typically drives property values up in the surrounding
          neighborhood. Think of it as finding undervalued properties before the rest of the
          market catches on.
        </div>

        {/* Usage steps */}
        <div className="help-section">
          <div className="help-section-label">Step-by-step: How to run a search</div>
          <div className="usage-steps">
            {USAGE_STEPS.map((step) => (
              <div key={step.num} className="usage-step">
                <div className="usage-step-left">
                  <div className="usage-step-num">{step.num}</div>
                  <div className="usage-step-icon">{step.icon}</div>
                </div>
                <div className="usage-step-body">
                  <div className="usage-step-title">{step.title}</div>
                  <p className="usage-step-content">{step.content}</p>
                  <div className="usage-example">
                    <span className="example-label">Example:</span> {step.example}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Understanding scores */}
        <div className="help-section">
          <div className="help-section-label">Understanding the 6 investment scores</div>
          <div className="scores-explainer">
            {[
              { icon: '🏗️', name: 'Zoning Transition', desc: 'How likely is the surrounding area to be rezoned to a higher-value classification? This is the most important score — high values mean the area is on the city\'s radar for development.' },
              { icon: '📈', name: 'Neighborhood Growth', desc: 'Is the area\'s population and income growing? Rising incomes and new businesses nearby are strong signals that property values will follow.' },
              { icon: '🗳️', name: 'Voting & Policy', desc: 'Do local politicians and recent ballot measures support development? Areas with pro-growth leadership rezone faster.' },
              { icon: '💎', name: 'Price-to-Value', desc: 'Is this property priced below what similar properties in already-rezoned nearby areas cost? A big discount here means big upside potential.' },
              { icon: '🚇', name: 'Infrastructure Pipeline', desc: 'Are there planned transit stops, roads, or major developments nearby? New infrastructure is one of the single strongest drivers of property appreciation.' },
              { icon: '🏦', name: 'Rental Income', desc: 'If you rent the property while holding it, will it cover its costs? Positive cash flow lets you wait longer for the appreciation to happen.' },
            ].map(s => (
              <div key={s.name} className="score-explainer-row">
                <div className="score-explainer-icon">{s.icon}</div>
                <div>
                  <div className="score-explainer-name">{s.name}</div>
                  <div className="score-explainer-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API key callout */}
        <div className="api-key-callout">
          <div className="api-key-callout-icon">🔑</div>
          <div className="api-key-callout-body">
            <strong>Want to use real Zillow property data?</strong>
            <p>You can connect this app to live Zillow listings by adding a free API key.
            It takes about 5 minutes and requires no payment.</p>
          </div>
          <button className="btn btn--primary btn--sm" onClick={() => { onClose(); onOpenApiKey(); }}>
            Set Up API Key →
          </button>
        </div>

        {/* FAQ */}
        <div className="help-section">
          <div className="help-section-label">Frequently asked questions</div>
          <div className="faq-list">
            {FAQ.map((item) => (
              <details key={item.q} className="faq-item">
                <summary className="faq-question">{item.q}</summary>
                <p className="faq-answer">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="help-footer">
          <button className="btn btn--primary" onClick={onClose}>Got it — let's search!</button>
        </div>

      </div>
    </div>
  );
}
