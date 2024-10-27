import { createSignal } from 'solid-js';
import { Modal, Button } from 'flowbite';

const SettingsDialog = ({ toggleSettingsDialog }) => {
  const [theme, setTheme] = createSignal('system');

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${event.target.value}-theme`);
  };

  return (
    <Modal show={true} onClose={toggleSettingsDialog}>
      <Modal.Header>
        <h2>Settings</h2>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label>
            Theme:
            <select value={theme()} onChange={handleThemeChange}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggleSettingsDialog}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingsDialog;
