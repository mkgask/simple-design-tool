import type { Component } from 'solid-js';
import Header from './components/Header';
import Main from './components/Main';

const App: Component = () => {
  return (
    <div class="App" data-testid="app">
      <Header />
      <Main />
    </div>
  );
};

export default App;
