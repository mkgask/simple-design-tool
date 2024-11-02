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

const createVectorDataCircle = () => {
  const points = [];
  const radius = 50;
  const centerX = 50;
  const centerY = 50;
  const numPoints = 100;

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({ x, y });
  }

  const vectorPath: VectorPath = {
    points,
    fillColor: 'transparent',
    strokeColor: '#888',
    strokeWidth: 1,
    strokeStyle: storokeType.Solid,
  };

  const vectorData: VectorData = {
    paths: [vectorPath],
  };

  if (layers().length === 0) {
    const defaultLayer = createLayer(createLayerID(), 'Default Layer', LayerType.Normal, vectorData);
    addLayer(defaultLayer);
  } else {
    const firstLayer = layers()[0];
    firstLayer.vectorData = vectorData;
    setLayers([firstLayer, ...layers().slice(1)]);
  }
};

export { LayerType, createLayer, createLayerID, addChildLayer, removeChildLayer, layers, setLayers, addLayer, removeLayer, editLayer, createVectorDataCircle };
export type { Layer };
