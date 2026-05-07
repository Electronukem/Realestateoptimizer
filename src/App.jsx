import { useEffect, useState } from 'react';
import { InputForm } from './components/InputForm/InputForm.jsx';
import { ResultsPage } from './components/ResultsPage/ResultsPage.jsx';
import { ProgressBar, LoadingSkeleton } from './components/common/LoadingSkeleton.jsx';
import { ApiKeyModal } from './components/ApiKeyModal/ApiKeyModal.jsx';
import { HelpModal } from './components/HelpModal/HelpModal.jsx';
import { usePropertySearch } from './hooks/usePropertySearch.js';
import { useApiKey } from './hooks/useApiKey.js';
import './App.css';

function App() {
  const { status, progress, results, search, reset } = usePropertySearch();
  const { apiKey, saveApiKey, hasKey } = useApiKey();
  const [showApiKey, setShowApiKey] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (status === 'results') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [status]);

  return (
    <div className="app">
      {/* ── Navigation bar ── */}
      <nav className="app-nav">
        <div className="nav-logo" onClick={reset} style={{ cursor: 'pointer' }}>
          <div className="nav-logo-icon">🏠</div>
          <span className="nav-logo-text">Real Estate Optimizer</span>
        </div>

        <div className="nav-right">
          {/* API key status pill */}
          <button
            className={`api-status-btn ${hasKey ? 'api-status-btn--connected' : 'api-status-btn--missing'}`}
            onClick={() => setShowApiKey(true)}
            title={hasKey ? 'API key saved — click to manage' : 'No API key — click to add one'}
          >
            <span className={`api-dot ${hasKey ? 'api-dot--green' : 'api-dot--amber'}`} />
            <span className="api-status-label">
              {hasKey ? 'API Key ✓' : 'Add API Key'}
            </span>
          </button>

          {/* Help button */}
          <button
            className="nav-icon-btn"
            onClick={() => setShowHelp(true)}
            title="How to use this app"
          >
            <span className="nav-icon-btn-icon">?</span>
            <span className="nav-icon-btn-label">Help</span>
          </button>

          {/* Settings / key button */}
          <button
            className="nav-icon-btn"
            onClick={() => setShowApiKey(true)}
            title="API Key Settings"
          >
            <span className="nav-icon-btn-icon">🔑</span>
            <span className="nav-icon-btn-label">API Key</span>
          </button>

          {status === 'results' && (
            <button className="btn btn--ghost btn--sm" onClick={reset}>New Search</button>
          )}
        </div>
      </nav>

      {/* ── Main content ── */}
      <main className="app-main">
        {status === 'idle' && (
          <div className="page-enter">
            <InputForm onSubmit={search} onOpenHelp={() => setShowHelp(true)} />
          </div>
        )}

        {status === 'loading' && (
          <div className="loading-page page-enter">
            <div className="loading-inner">
              <ProgressBar progress={progress} />
              <LoadingSkeleton />
            </div>
          </div>
        )}

        {status === 'results' && results && (
          <div className="page-enter">
            <ResultsPage results={results} onReset={reset} />
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="app-footer">
        <p>
          Real Estate Optimizer &nbsp;·&nbsp; All property data is simulated for demonstration
          &nbsp;·&nbsp; Not financial advice
          &nbsp;·&nbsp;
          <button className="footer-link" onClick={() => setShowHelp(true)}>How to use</button>
          &nbsp;·&nbsp;
          <button className="footer-link" onClick={() => setShowApiKey(true)}>API Key Setup</button>
        </p>
      </footer>

      {/* ── Modals ── */}
      {showApiKey && (
        <ApiKeyModal
          apiKey={apiKey}
          onSave={saveApiKey}
          onClose={() => setShowApiKey(false)}
        />
      )}

      {showHelp && (
        <HelpModal
          onClose={() => setShowHelp(false)}
          onOpenApiKey={() => setShowApiKey(true)}
        />
      )}
    </div>
  );
}

export default App;
