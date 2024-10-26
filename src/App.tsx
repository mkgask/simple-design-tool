import { Component, createSignal, onCleanup } from 'solid-js';
import Header from './components/Header';
import Main from './components/Main';

const App: Component = () => {
  const [theme, setTheme] = createSignal('system');

  const applyTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
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
    <div class="App" data-testid="app">
      <Header />
      <Main />
    </div>
  );
};

export default App;
