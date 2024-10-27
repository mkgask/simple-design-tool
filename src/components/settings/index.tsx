import { createSignal } from 'solid-js';
import { theme, setTheme, applyTheme } from '../../modules/Theme'; // Import the applyTheme function

const SettingsDialog = ({ toggleSettingsDialog }) => {

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    applyTheme(selectedTheme); // Update the theme in App.tsx
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div class="rounded-lg shadow-lg w-96">
        <div class="flex justify-between items-center p-4 border-b dark:border-gray-600">
          <h2 class="text-xl font-semibold">Settings</h2>
          <button onClick={toggleSettingsDialog} class="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        <div class="p-4">
          <label class="block mb-2">
            Theme:
            <div class="flex space-x-4 mt-1">
              <button
                class={`p-2 rounded-md ${theme.value === 'light' ? 'border-2 border-blue-500' : 'border'}`}
                onClick={() => handleThemeChange('light')}
              >
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l1.414 1.414M7.05 7.05 5.636 5.636M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/>
                </svg>
              </button>
              <button
                class={`p-2 rounded-md ${theme.value === 'dark' ? 'border-2 border-blue-500' : 'border'}`}
                onClick={() => handleThemeChange('dark')}
              >
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>
                </svg>
              </button>
              <button
                class={`p-2 rounded-md ${theme.value === 'system' ? 'border-2 border-blue-500' : 'border'}`}
                onClick={() => handleThemeChange('system')}
              >
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 3.5 8.5 7.5m6-4-1.25 4m-1.5 5h-3l-1.5 4h6l-1.5-4Zm0 0h3l1.5-4h-6l1.5 4ZM12 12V9m0 3v3m0-3h3m-3 0H9"/>
                </svg>
              </button>
            </div>
          </label>
        </div>

        <div class="flex justify-end p-4 border-t dark:border-gray-600">
          <button onClick={toggleSettingsDialog} class="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsDialog;
