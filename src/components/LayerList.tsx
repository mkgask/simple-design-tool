import { Component, createSignal } from 'solid-js';
import LayerDialogAdd from './LayerDialogAdd';
import { LayerType } from '../modules/Layers';

const LayerList: Component = () => {
  const [layers, setLayers] = createSignal<{ name: string; type: LayerType }[]>([]);
  const [isDialogOpen, setIsDialogOpen] = createSignal(false);

  const handleAddLayer = (name: string, type: LayerType) => {
    setLayers([...layers(), { name, type }]);
  };

  return (
    <div class="layer-list">
      <h2 class="text-xl font-semibold mb-4">Layer</h2>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => setIsDialogOpen(true)}
      >
        ＋
      </button>
      {isDialogOpen() && (
        <LayerDialogAdd
          onAddLayer={handleAddLayer}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
      <ul class="mt-4">
        {layers().map((layer) => (
          <li class="mb-2">
            {layer.name} ({layer.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LayerList;
