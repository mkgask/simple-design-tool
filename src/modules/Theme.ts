import { createSignal } from 'solid-js';

export const [theme, setTheme] = createSignal('system');

export const queryMatchDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');

export const applyTheme = (theme: string) => {
  document.body.classList.remove('light', 'dark');
  if (theme === 'system') {
    const systemTheme = queryMatchDarkTheme.matches ? 'dark' : 'light';
    document.body.classList.add(systemTheme);
  } else {
    document.body.classList.add(theme);
  }
};

export const handleSystemThemeChange = (event: MediaQueryListEvent) => {
  if (theme() === 'system') {
    applyTheme(event.matches ? 'dark' : 'light');
  }
};

export const initTheme = (onCleanup: CallableFunction) => {
  applyTheme(theme());
  queryMatchDarkTheme.addEventListener('change', handleSystemThemeChange);

  onCleanup(() => {
    queryMatchDarkTheme.removeEventListener('change', handleSystemThemeChange);
  });
}
