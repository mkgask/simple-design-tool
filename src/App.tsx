import { Component, onCleanup } from 'solid-js';
import Header from './components/Header';
import Main from './components/Main';
import { initTheme } from './modules/Theme';

import 'flowbite';

const App: Component = () => {
  initTheme(onCleanup);

  return (
    <div class="text-gray-800 dark:bg-gray-800 dark:text-gray-100" style="min-height: 100vh" data-testid="app">
      <Header />
      <Main />
    </div>
  );
};

export default App;
