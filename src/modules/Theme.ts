export const applyTheme = (theme: string) => {
  document.body.classList.remove('light', 'dark', 'system');
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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
