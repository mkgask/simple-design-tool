import { createSignal } from 'solid-js';
import type { Point } from './Point';

/*  Properties
*/

enum LayerType {
  Normal = 'normal',
  Effect = 'effect',
}

enum strokeType {
  Solid = 'solid',
  Dashed = 'dashed',
}

interface VectorPath {
  points: Point[];
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  strokeStyle?: strokeType;
}

interface VectorData {
  paths: VectorPath[];
}

interface Layer {
  id: string;
  name: string;
  type: LayerType;
  children: Layer[];
  size: Point;
  position: Point;
  vectorData?: VectorData;
}

/*  Foundation
*/

const createLayer = (id: string, name: string, type: LayerType, vectorData?: VectorData, size?: Point, position?: Point): Layer => {
  return {
    id,
    name,
    type,
    children: [],
    size: size ? size : { x: 100, y: 100 },
    position: position ? position : { x: 0, y: 0 },
    vectorData,
  };
}

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

const pushLayer = (layer: Layer) => {
  setLayers([layer, ...layers()]);
}

const removeLayer = (layerId: string) => {
  setLayers(layers().filter(layer => layer.id !== layerId));
};

const editLayer = (layerId: string, name: string, type: LayerType) => {
  setLayers(layers().map(layer => layer.id === layerId ? { ...layer, name, type } : layer));
}

/*  Modules Vectoring
*/

const createVectorDataCircle = (): VectorData => {
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
    strokeStyle: strokeType.Solid,
  };

  const vectorData: VectorData = {
    paths: [vectorPath],
  };

  return vectorData;
};

/*  Modules Rendering
*/

const renderVectorDataOnCanvas = (canvas: HTMLCanvasElement, vectorData: VectorData) => {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Initialize canvas with white background
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw vectorData content on the canvas, centered and scaled
    const { paths } = vectorData;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const scale = Math.min(canvasWidth, canvasHeight) / 100;
    const offsetX = (canvasWidth - 100 * scale) / 2;
    const offsetY = (canvasHeight - 100 * scale) / 2;

    paths.forEach((path: VectorPath) => {
      ctx.beginPath();
      path.points.forEach((point, index) => {
        const x = point.x * scale + offsetX;
        const y = point.y * scale + offsetY;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.fillStyle = path.fillColor || 'transparent';
      ctx.fill();
      ctx.strokeStyle = path.strokeColor || 'black';
      ctx.lineWidth = path.strokeWidth || 1;
      ctx.stroke();
    });
  }
};

/*  Modules Positioning
*/

const calculateCenter = (layer: Layer) => {
  const { size, position } = layer;

  if (!size || !position) {
    return { x: 50, y: 50 };
  }

  return {
    x: position.x + size.x / 2,
    y: position.y + size.y / 2,
  };
}

/* Export
*/

export { LayerType, createLayer, createLayerID, addChildLayer, removeChildLayer, layers, setLayers, addLayer, pushLayer, removeLayer, editLayer, createVectorDataCircle, renderVectorDataOnCanvas, calculateCenter };
export type { Layer };
