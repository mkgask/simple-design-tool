import { Component, createSignal } from 'solid-js';
import SettingsDialog from './settings';
import { Navbar, Button } from 'flowbite';

const Header: Component = () => {
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = createSignal(false);

  const toggleSettingsDialog = () => {
    setIsSettingsDialogOpen(!isSettingsDialogOpen());
  };

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand>
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          simple-design-tool
        </span>
      </Navbar.Brand>
      <div class="flex md:order-2">
        <Button onClick={toggleSettingsDialog}>Settings</Button>
      </div>
      {isSettingsDialogOpen() && <SettingsDialog toggleSettingsDialog={toggleSettingsDialog} />}
    </Navbar>
  );
};

export default Header;
