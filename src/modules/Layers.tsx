import { createSignal } from 'solid-js';

type LayerType = 'normal' | 'effect';

interface Layer {
  id: string;
  name: string;
  type: LayerType;
  children: Layer[];
}

const createLayer = (id: string, name: string, type: LayerType): Layer => ({
  id,
  name,
  type,
  children: [],
});

const addChildLayer = (parentLayer: Layer, childLayer: Layer) => {
  parentLayer.children.push(childLayer);
};

const removeChildLayer = (parentLayer: Layer, childLayerId: string) => {
  parentLayer.children = parentLayer.children.filter(child => child.id !== childLayerId);
};

const [layers, setLayers] = createSignal<Layer[]>([]);

const addLayer = (layer: Layer) => {
  setLayers([...layers(), layer]);
};

const removeLayer = (layerId: string) => {
  setLayers(layers().filter(layer => layer.id !== layerId));
};

export { createLayer, addChildLayer, removeChildLayer, layers, addLayer, removeLayer };
