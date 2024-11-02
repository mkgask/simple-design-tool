import { createSignal } from 'solid-js';

enum LayerType {
  Normal = 'normal',
  Effect = 'effect',
}

enum storokeType {
  Solid = 'solid',
  Dashed = 'dashed',
}

interface VectorPath {
  points: { x: number, y: number }[];
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  strokeStyle?: storokeType;
}

interface VectorData {
  paths: VectorPath[];
}

interface Layer {
  id: string;
  name: string;
  type: LayerType;
  children: Layer[];
  vectorData?: VectorData;
}

const createLayer = (id: string, name: string, type: LayerType, vectorData?: VectorData): Layer => ({
  id,
  name,
  type,
  children: [],
  vectorData,
});

const createLayerID = () => Math.random().toString(36).substring(2, 9);

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

const editLayer = (layerId: string, name: string, type: LayerType) => {
  setLayers(layers().map(layer => layer.id === layerId ? { ...layer, name, type } : layer));
}

export { LayerType, createLayer, createLayerID, addChildLayer, removeChildLayer, layers, setLayers, addLayer, removeLayer, editLayer };
export type { Layer };
