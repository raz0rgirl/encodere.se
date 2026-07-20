import { useEffect, useState } from 'react';
import { getStoredTheme, getSystemTheme, setTheme, type Theme } from '../../lib/theme';

export function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    setThemeState(getStoredTheme() ?? 'dark');
  }, []);

  function handleToggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setThemeState(next);
  }

  return (
    <button
      type="button"
      className="encodere-theme-toggle"
      onClick={handleToggle}
      aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
      aria-pressed={theme === 'dark'}
    >
      {theme === 'dark' ? '◐ claro' : '◑ escuro'}
    </button>
  );
}