import { useState, useCallback } from 'react';

const STORAGE_KEY = 'reo_zillow_api_key';

export function useApiKey() {
  const [apiKey, setApiKeyState] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || ''; } catch { return ''; }
  });

  const saveApiKey = useCallback((key) => {
    const trimmed = key.trim();
    try { localStorage.setItem(STORAGE_KEY, trimmed); } catch { /* ignore */ }
    setApiKeyState(trimmed);
  }, []);

  const clearApiKey = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setApiKeyState('');
  }, []);

  return { apiKey, saveApiKey, clearApiKey, hasKey: apiKey.length > 0 };
}
