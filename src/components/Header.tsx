import { Component, createSignal } from 'solid-js';
import SettingsDialog from './settings';

const Header: Component = () => {
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = createSignal(false);

  const toggleSettingsDialog = () => {
    setIsSettingsDialogOpen(!isSettingsDialogOpen());
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#282c34', color: 'white' }}>
      <h1>simple-design-tool</h1>
      <button onClick={toggleSettingsDialog}>Settings</button>
      {isSettingsDialogOpen() && <SettingsDialog />}
    </header>
  );
};

export default Header;
