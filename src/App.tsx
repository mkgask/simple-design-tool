import { Component, createSignal, onCleanup } from 'solid-js';
import Header from './components/Header';
import Main from './components/Main';

import 'flowbite';

const App: Component = () => {
  const [theme, setTheme] = createSignal('system');

  const applyTheme = (theme: string) => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(`${theme}`);
  };

  const handleSystemThemeChange = (event: MediaQueryListEvent) => {
    if (theme() === 'system') {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  };

  const systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  systemThemeMediaQuery.addEventListener('change', handleSystemThemeChange);

  onCleanup(() => {
    systemThemeMediaQuery.removeEventListener('change', handleSystemThemeChange);
  });

  return (
    <div class="text-gray-800 dark:bg-gray-800 dark:text-white" style="min-height: 100vh" data-testid="app">
      <Header />
      <Main />
    </div>
  );
};

export default App;
