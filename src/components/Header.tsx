import { Component } from 'solid-js';

const Header: Component = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#282c34', color: 'white' }}>
      <h1>simple-design-tool</h1>
      <button onClick={() => alert('Settings dialog')}>Settings</button>
    </header>
  );
};

export default Header;
