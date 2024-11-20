import { Component, createSignal } from 'solid-js';
import LayerDialogAdd from './LayerDialogAdd';
import LayerDialogEdit from './LayerDialogEdit';
import LayerDialogDelete from './LayerDialogDelete';
import { layers, createLayerID, createLayer, addLayer, editLayer, removeLayer, LayerType, selectedLayer, setSelectedLayer } from '../modules/Layers';
import LayerThumbnail from './LayerThumbnail';
import { drawCanvas, drawSelectLayerOutline } from '../modules/Canvas';

const LayerList: Component = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = createSignal(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = createSignal(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = createSignal(false);

  const handleAddLayer = (name: string, type: LayerType) => {
    addLayer(createLayer(createLayerID(), name, type));
    drawCanvas(layers(), document.querySelector('canvas'));
  };

  const handleEditLayer = (id: string, name: string, type: LayerType) => {
    editLayer(id, name, type);
    drawCanvas(layers(), document.querySelector('canvas'));
  };

  const handleDeleteLayer = () => {
    if (selectedLayer()) {
      removeLayer(selectedLayer().id);
      setIsDeleteDialogOpen(false);
      drawCanvas(layers(), document.querySelector('canvas'));
    }
  };

  return (
    <div class="layer-list">
      <div class="p-4 flex justify-between align-center border-b dark:border-gray-600">
        <h2 class="text-xl font-semibold">Layer</h2>

        <button
          class="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
          </svg>
        </button>

        {isAddDialogOpen() && (
          <LayerDialogAdd
            onAddLayer={handleAddLayer}
            onClose={() => setIsAddDialogOpen(false)}
          />
        )}
      </div>

      <ul>
        {layers().map((layer) => (
          <li class="p-2 border-b dark:border-gray-600 flex justify-between items-center">
            <div class="flex items-center space-x-2"
              onClick={() => {
                setSelectedLayer(layer);
                drawSelectLayerOutline(layer, document.querySelector('canvas'));
              }}
            >
              {selectedLayer() && selectedLayer().id === layer.id ? (
                <svg class="w-4 h-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              ) : (
                <div class="w-4 h-4"></div>
              )}

              <LayerThumbnail vectorData={layer.vectorData} />
              <span class="text-sm">{layer.name} <span class="text-xs">({layer.type})</span></span>
            </div>

            <div class="flex space-x-2">
              <button
                class="p-1 text-blue-500"
                onClick={() => {
                  setSelectedLayer(layer);
                  setIsEditDialogOpen(true);
                }}
              >
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/>
                </svg>
              </button>

              <button
                class="p-1 text-red-500"
                onClick={() => {
                  setSelectedLayer(layer);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isEditDialogOpen() && selectedLayer() && (
        <LayerDialogEdit
          layer={selectedLayer()}
          onEditLayer={handleEditLayer}
          onClose={() => setIsEditDialogOpen(false)}
        />
      )}

      {isDeleteDialogOpen() && selectedLayer() && (
        <LayerDialogDelete
          layerName={selectedLayer().name}
          layerType={selectedLayer().type}
          onDelete={handleDeleteLayer}
          onClose={() => setIsDeleteDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default LayerList;
