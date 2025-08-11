'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // read current on mount (handles SSR)
  useEffect(() => {
    const has = document.documentElement.classList.contains('dark');
    setIsDark(has);
  }, []);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
  }

  return (
    <button
      onClick={toggle}
      className="rounded-xl px-4 py-2 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"
      aria-pressed={isDark}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}