import { useCallback, useRef } from 'react';
import './RangeSlider.css';

export function RangeSlider({ min, max, value, onChange, step = 1000, format }) {
  const trackRef = useRef(null);

  const pct = (v) => ((v - min) / (max - min)) * 100;

  const handleMouseDown = useCallback((which) => (e) => {
    e.preventDefault();
    const move = (ev) => {
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
      const raw = min + ratio * (max - min);
      const stepped = Math.round(raw / step) * step;
      if (which === 'min') {
        onChange({ min: Math.min(stepped, value.max - step), max: value.max });
      } else {
        onChange({ min: value.min, max: Math.max(stepped, value.min + step) });
      }
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  }, [min, max, step, value, onChange]);

  const fmt = format || ((v) => `$${(v / 1000).toFixed(0)}K`);

  return (
    <div className="range-slider">
      <div className="range-slider__labels">
        <span>{fmt(value.min)}</span>
        <span>{fmt(value.max)}</span>
      </div>
      <div className="range-slider__track" ref={trackRef}>
        <div
          className="range-slider__fill"
          style={{ left: `${pct(value.min)}%`, width: `${pct(value.max) - pct(value.min)}%` }}
        />
        <div
          className="range-slider__thumb"
          style={{ left: `${pct(value.min)}%` }}
          onMouseDown={handleMouseDown('min')}
        />
        <div
          className="range-slider__thumb"
          style={{ left: `${pct(value.max)}%` }}
          onMouseDown={handleMouseDown('max')}
        />
      </div>
      <div className="range-slider__inputs">
        <div className="range-input-group">
          <label>Min</label>
          <input
            type="number"
            value={value.min}
            step={step}
            min={min}
            max={value.max - step}
            onChange={e => onChange({ min: Number(e.target.value), max: value.max })}
          />
        </div>
        <div className="range-input-group">
          <label>Max</label>
          <input
            type="number"
            value={value.max}
            step={step}
            min={value.min + step}
            max={max}
            onChange={e => onChange({ min: value.min, max: Number(e.target.value) })}
          />
        </div>
      </div>
    </div>
  );
}
