import { createSignal } from 'solid-js';

const SettingsDialog = () => {
  const [theme, setTheme] = createSignal('system');

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
    document.documentElement.setAttribute('data-theme', event.target.value);
  };

  return (
    <div style={{ position: 'fixed', top: '10%', left: '10%', width: '80%', height: '80%', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Settings</h2>
        <button onClick={() => document.getElementById('settings-dialog').style.display = 'none'}>Close</button>
      </div>
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
    </div>
  );
};

export default SettingsDialog;
