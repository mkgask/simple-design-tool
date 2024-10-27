import { createSignal } from 'solid-js';

export const [theme, setTheme] = createSignal('system');

export const queryMatchDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');

export const saveThemeToLocalStorage = (theme: string) => {
  localStorage.setItem('selectedTheme', theme);
};

export const getThemeFromLocalStorage = () => {
  return localStorage.getItem('selectedTheme') || 'system';
};

export const applyTheme = (theme: string) => {
  document.body.classList.remove('light', 'dark');
  if (theme === 'system') {
    const systemTheme = queryMatchDarkTheme.matches ? 'dark' : 'light';
    document.body.classList.add(systemTheme);
  } else {
    document.body.classList.add(theme);
  }
  saveThemeToLocalStorage(theme);
};

export const handleSystemThemeChange = (event: MediaQueryListEvent) => {
  if (theme() === 'system') {
    applyTheme(event.matches ? 'dark' : 'light');
  }
};

export const initTheme = (onCleanup: CallableFunction) => {
  const savedTheme = getThemeFromLocalStorage();
  setTheme(savedTheme);
  applyTheme(savedTheme);
  queryMatchDarkTheme.addEventListener('change', handleSystemThemeChange);

  onCleanup(() => {
    queryMatchDarkTheme.removeEventListener('change', handleSystemThemeChange);
  });
}
