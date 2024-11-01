import { Component, createSignal } from 'solid-js';
import { LayerType } from '../modules/Layers'; // Pd6ac

const LayerDialogAdd: Component<{ onAddLayer: (name: string, type: LayerType) => void, onClose: () => void }> = (props) => {
  const [layerName, setLayerName] = createSignal('');
  const [layerType, setLayerType] = createSignal(LayerType.Normal);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    props.onAddLayer(layerName(), layerType());
    props.onClose();
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-96 p-4">
        <h2 class="text-xl font-semibold mb-4">Add Layer</h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-4">
            <label for="layerName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Layer Name</label>
            <input
              type="text"
              id="layerName"
              value={layerName()}
              onInput={(e) => setLayerName(e.currentTarget.value)}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div class="mb-4">
            <label for="layerType" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Layer Type</label>
            <select
              id="layerType"
              value={layerType()}
              onChange={(e) => setLayerType(e.currentTarget.value as LayerType)}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              {Object.values(LayerType).map((type) => (
                <option value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              onClick={props.onClose}
              class="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LayerDialogAdd;
