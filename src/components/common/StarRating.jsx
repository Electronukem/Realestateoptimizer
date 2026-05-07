import { useEffect, useRef, useState } from 'react';
import './StarRating.css';

export function StarRating({ score, size = 'md', animate = false, showNumber = false }) {
  const [displayed, setDisplayed] = useState(animate ? 0 : score);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!animate) { setDisplayed(score); return; }
    const start = performance.now();
    const duration = 800;
    const animateStep = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplayed(ease * score);
      if (t < 1) rafRef.current = requestAnimationFrame(animateStep);
    };
    rafRef.current = requestAnimationFrame(animateStep);
    return () => cancelAnimationFrame(rafRef.current);
  }, [score, animate]);

  const full = Math.floor(displayed);
  const partial = displayed - full;
  const empty = 5 - full - (partial > 0.1 ? 1 : 0);

  return (
    <span className={`star-rating star-rating--${size}`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} className="star star--full" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      {partial > 0.1 && (
        <svg key="p" className="star star--partial" viewBox="0 0 24 24">
          <defs>
            <linearGradient id={`pg-${score}`}>
              <stop offset={`${partial * 100}%`} stopColor="currentColor" />
              <stop offset={`${partial * 100}%`} stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill={`url(#pg-${score})`} stroke="currentColor" strokeWidth="0.5"
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )}
      {Array.from({ length: Math.max(0, empty) }).map((_, i) => (
        <svg key={`e${i}`} className="star star--empty" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      {showNumber && <span className="star-number">{score.toFixed(1)}</span>}
    </span>
  );
}
