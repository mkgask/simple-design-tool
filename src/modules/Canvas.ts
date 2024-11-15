import type { Point } from './Point';
import type { Layer } from './Layers';

interface Canvas {
  size: Point;
}

const createCanvas = (size: Point): Canvas => {
  return {
    size,
  };
};

const drawCanvas = (layers: Layer[], element: HTMLCanvasElement): void => {
  // Implementation for drawing layers on the canvas
  const context = element.getContext('2d');

  if (!context) {
    throw new Error('Failed to get 2d context from canvas element');
  }

  layers.forEach((layer) => {
    // Draw each layer on the canvas
    if (layer.vectorData) {
      layer.vectorData.paths.forEach((path) => {
        context.beginPath();

        path.points.forEach((point, index) => {
          if (index === 0) {
            context.moveTo(point.x, point.y);
          } else {
            context.lineTo(point.x, point.y);
          }
        });

        context.closePath();
        context.fillStyle = path.fillColor || 'transparent';
        context.fill();
        context.strokeStyle = path.strokeColor || 'black';
        context.lineWidth = path.strokeWidth || 1;
        context.stroke();
      });
    }

    if (layer.children) {
      drawCanvas(layer.children, element);
    }
  });
};

const clearCanvas = (canvas: Canvas, element: HTMLCanvasElement): void => {
  // Implementation for clearing the canvas
  element.width = canvas.size.x;
  element.height = canvas.size.y;

  const context = element.getContext('2d');

  if (context) {
    context.clearRect(0, 0, canvas.size.x, canvas.size.y);
  }
};

const selectLayer = (layer: Layer, element: HTMLCanvasElement): void => {
  // Implementation for selecting a layer on the canvas
  const context = element.getContext('2d');

  if (!context) {
    throw new Error('Failed to get 2d context from canvas element');
  }

  context.strokeStyle = 'red';
  context.lineWidth = 3;
  context.strokeRect(layer.position.x, layer.position.y, layer.size.x, layer.size.y);
};

export { createCanvas, drawCanvas, clearCanvas, selectLayer };
export type { Canvas };
