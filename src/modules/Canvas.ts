import type { Point } from './Point';
import type { Layer } from './Layers';

interface Canvas {
  size: Point;
  layers: Layer[];
  selectedLayer?: Layer;
}

const createCanvas = (size: Point): Canvas => {
  return {
    size,
    layers: [],
  };
};

const drawCanvas = (layers: Layer[]): void => {
  // Implementation for drawing layers on the canvas
};

const clearCanvas = (): void => {
  // Implementation for clearing the canvas
};

const selectLayer = (layer: Layer): void => {
  // Implementation for selecting a layer on the canvas
};

export { createCanvas, drawCanvas, clearCanvas, selectLayer };
export type { Canvas };
