import { Component, createSignal } from 'solid-js';
import { addLayer, createLayer, createLayerID, createVectorDataCircle, LayerType } from '../modules/Layers';

const ToolbarRegistrationShape: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen());
  };

  const handleCircleClick = () => {
    addLayer(createLayer(createLayerID(), 'Circle Layer', LayerType.Normal, createVectorDataCircle()));
    setIsOpen(false);
  };

  return (
    <div class="relative">
      <button class="btn" onClick={toggleDropdown}>
        図形登録▼
      </button>
      {isOpen() && (
        <div class="absolute mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg">
          <ul>
            <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={handleCircleClick}>
              <svg class="w-6 h-6 inline-block mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              </svg>
              Circle
            </li>
            <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <svg class="w-6 h-6 inline-block mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 24 24">
                <rect x="4" y="4" width="16" height="16" stroke="currentColor" stroke-width="2"/>
              </svg>
              Square
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ToolbarRegistrationShape;
