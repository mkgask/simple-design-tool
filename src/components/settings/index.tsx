import { createSignal } from 'solid-js';
import { theme, setTheme, applyTheme, ThemeType } from '../../modules/Theme';

const SettingsDialog = ({ toggleSettingsDialog }) => {

  const handleThemeChange = (selectedTheme: ThemeType) => {
    setTheme(selectedTheme);
    applyTheme(selectedTheme);
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div class="rounded-lg shadow-lg w-96">
        <div class="flex justify-between items-center p-4 border-b dark:border-gray-600">
          <h2 class="text-xl font-semibold">Settings</h2>

          <button onClick={toggleSettingsDialog} class="text-lg text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
          </button>
        </div>

        <div class="p-4">
          <label class="block mb-2">
            Theme
            <div class="flex space-x-4 mt-1">
              {Object.values(ThemeType).map((themeType) => (
                <button
                  class={`p-2 rounded-md size-18 flex flex-col justify-center items-center ${theme() === themeType ? 'border-2 border-blue-500' : 'border'}`}
                  onClick={() => handleThemeChange(themeType)}
                >
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    {themeType === ThemeType.Light && (
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
                    )}
                    {themeType === ThemeType.Dark && (
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"/>
                    )}
                    {themeType === ThemeType.System && (
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v5m-3 0h6M4 11h16M5 15h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z"/>
                    )}
                  </svg>
                  {themeType.charAt(0).toUpperCase() + themeType.slice(1)}
                </button>
              ))}
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
