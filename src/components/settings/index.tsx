import { createSignal } from 'solid-js';
import { applyTheme } from '../../App'; // Import the applyTheme function

const SettingsDialog = ({ toggleSettingsDialog }) => {
  const [theme, setTheme] = createSignal('system');

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
    applyTheme(selectedTheme); // Update the theme in App.tsx
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div class="rounded-lg shadow-lg w-96">
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-semibold">Settings</h2>
          <button onClick={toggleSettingsDialog} class="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div class="p-4">
          <label class="block mb-2">
            Theme:
            <select value={theme()} onChange={handleThemeChange} class="block w-full mt-1 border-gray-300 rounded-md">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </label>
        </div>
        <div class="flex justify-end p-4 border-t">
          <button onClick={toggleSettingsDialog} class="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsDialog;
