import { useState, useCallback } from 'react';
import { generateProperties } from '../data/propertyGenerator.js';
import { scoreProperty, buildExplanations } from '../data/scoringEngine.js';

export function usePropertySearch() {
  const [status, setStatus] = useState('idle'); // idle | loading | results
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const search = useCallback(async (criteria) => {
    setStatus('loading');
    setProgress(0);
    setError(null);

    try {
      await tick(300);
      setProgress(20);

      const { properties, corridor, zip, locationInfo } = generateProperties(criteria);
      setProgress(50);

      await tick(400);
      setProgress(65);

      const scored = properties.map(prop => {
        const scores = scoreProperty(prop);
        const explanations = buildExplanations(prop, scores);
        return { ...prop, scores, explanations };
      });

      scored.sort((a, b) => b.scores.overall - a.scores.overall);

      setProgress(85);
      await tick(300);
      setProgress(100);
      await tick(200);

      const highScoreCount = scored.filter(p => p.scores.overall >= 4).length;

      setResults({
        properties: scored,
        corridor,
        zip,
        locationInfo,
        criteria,
        summary: {
          total: scored.length,
          highScore: highScoreCount,
          topScore: scored[0]?.scores.overall || 0,
          avgScore: scored.reduce((a, p) => a + p.scores.overall, 0) / scored.length,
        },
      });
      setStatus('results');
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setResults(null);
    setProgress(0);
    setError(null);
  }, []);

  return { status, progress, results, error, search, reset };
}

function tick(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
