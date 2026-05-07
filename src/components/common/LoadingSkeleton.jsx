import './LoadingSkeleton.css';

export function LoadingSkeleton() {
  return (
    <div className="loading-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton-card" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="skeleton-img" />
          <div className="skeleton-body">
            <div className="skeleton-line skeleton-line--wide" />
            <div className="skeleton-line skeleton-line--med" />
            <div className="skeleton-line skeleton-line--narrow" />
            <div className="skeleton-stats">
              <div className="skeleton-stat" />
              <div className="skeleton-stat" />
              <div className="skeleton-stat" />
            </div>
            <div className="skeleton-stars" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProgressBar({ progress }) {
  return (
    <div className="progress-container">
      <div className="progress-header">
        <div className="progress-spinner" />
        <span>Analyzing properties<span className="progress-dots" /></span>
        <span className="progress-pct">{Math.round(progress)}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-steps">
        <span className={progress >= 20 ? 'step-done' : ''}>Generating listings</span>
        <span className={progress >= 50 ? 'step-done' : ''}>Fetching zoning data</span>
        <span className={progress >= 65 ? 'step-done' : ''}>Scoring metrics</span>
        <span className={progress >= 85 ? 'step-done' : ''}>Building report</span>
      </div>
    </div>
  );
}
