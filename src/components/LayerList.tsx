import { Component, createSignal } from 'solid-js';
import LayerDialogAdd from './LayerDialogAdd';
import { layers, createLayerID, addLayer, LayerType } from '../modules/Layers';

const LayerList: Component = () => {
  const [isDialogOpen, setIsDialogOpen] = createSignal(false);

  const handleAddLayer = (name: string, type: LayerType) => {
    addLayer({ id: createLayerID(), name, type, children: [] });
  };

  return (
    <div class="layer-list">
      <div class="p-4 flex justify-between align-center border-b dark:border-gray-600">
        <h2 class="text-xl font-semibold">Layer</h2>
        <button
          class="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          onClick={() => setIsDialogOpen(true)}
        >
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
          </svg>
        </button>
        {isDialogOpen() && (
          <LayerDialogAdd
            onAddLayer={handleAddLayer}
            onClose={() => setIsDialogOpen(false)}
          />
        )}
      </div>
      <ul>
        {layers().map((layer) => (
          <li class="p-2 border-b dark:border-gray-600">
            {layer.name} ({layer.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LayerList;
