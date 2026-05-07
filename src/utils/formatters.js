export function formatPrice(price) {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(2)}M`;
  if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
  return `$${price.toLocaleString()}`;
}

export function formatPriceFull(price) {
  return `$${price.toLocaleString()}`;
}

export function formatSqft(sqft) {
  if (!sqft) return 'N/A';
  return `${sqft.toLocaleString()} sqft`;
}

export function formatLotSize(acres) {
  if (!acres) return 'N/A';
  if (acres < 0.1) return `${Math.round(acres * 43560)} sqft`;
  return `${acres} acres`;
}

export function formatPricePerSqft(pps) {
  if (!pps) return 'N/A';
  return `$${pps}/sqft`;
}

export function starsToPercent(stars) {
  return (stars / 5) * 100;
}

export function scoreLabel(score) {
  if (score >= 4.5) return 'Excellent';
  if (score >= 3.5) return 'Very Good';
  if (score >= 2.5) return 'Good';
  if (score >= 1.5) return 'Fair';
  return 'Poor';
}

export function scoreColor(score) {
  if (score >= 4.0) return 'var(--color-emerald)';
  if (score >= 3.0) return 'var(--color-blue)';
  if (score >= 2.0) return 'var(--color-amber)';
  return 'var(--color-red)';
}

export function pinColor(score) {
  if (score >= 4.0) return '#10b981';
  if (score >= 3.0) return '#f59e0b';
  return '#ef4444';
}
