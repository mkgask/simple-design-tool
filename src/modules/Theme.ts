import { createSignal } from 'solid-js';

export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export const [theme, setTheme] = createSignal(ThemeType.System);

export const queryMatchDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');

export const saveThemeToLocalStorage = (theme: ThemeType) => {
  localStorage.setItem('selectedTheme', theme);
};

export const getThemeFromLocalStorage = () => {
  return (localStorage.getItem('selectedTheme') as ThemeType) || ThemeType.System;
};

export const applyTheme = (theme: ThemeType) => {
  document.body.classList.remove(ThemeType.Light, ThemeType.Dark);

  if (theme === ThemeType.System) {
    const systemTheme = queryMatchDarkTheme.matches ? ThemeType.Dark : ThemeType.Light;
    document.body.classList.add(systemTheme);
  } else {
    document.body.classList.add(theme);
  }

  saveThemeToLocalStorage(theme);
};

export const handleSystemThemeChange = (event: MediaQueryListEvent) => {
  if (theme() === ThemeType.System) {
    applyTheme(event.matches ? ThemeType.Dark : ThemeType.Light);
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
