import type { Point } from './Point';
import type { Layer } from './Layers';

interface Canvas {
  size: Point;
  backgroundColor: string;
}

const createCanvas = (size: Point, backgroundColor: string): Canvas => {
  return {
    size: size || { x: 800, y: 600 },
    backgroundColor: backgroundColor || '#fff',
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
            context.moveTo(
              layer.position.x + point.x,
              layer.position.y + point.y
            );
          } else {
            context.lineTo(
              layer.position.x + point.x,
              layer.position.y + point.y
            );
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
    context.fillStyle = canvas.backgroundColor;
    context.fillRect(0, 0, canvas.size.x, canvas.size.y);
  }
};

const drawSelectLayerOutline = (layer: Layer, element: HTMLCanvasElement): void => {
  // Implementation for selecting a layer on the canvas
  const context = element.getContext('2d');

  if (!context) {
    throw new Error('Failed to get 2d context from canvas element');
  }

  //context.fillStyle = 'transparent';
  context.strokeStyle = 'lightblue';
  context.lineWidth = 3;
  context.strokeRect(layer.position.x, layer.position.y, layer.size.x, layer.size.y);
};

const enableLayerDragging = (layer: Layer, element: HTMLCanvasElement, onUpdate: (position: Point) => void): CallableFunction => {
  const context = element.getContext('2d');
  if (!context) {
    throw new Error('Failed to get 2d context from canvas element');
  }

  let isDragging = false;
  let startX = 0;
  let startY = 0;

  const onMouseDown = (event: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (
      x >= layer.position.x &&
      x <= layer.position.x + layer.size.x &&
      y >= layer.position.y &&
      y <= layer.position.y + layer.size.y
    ) {
      isDragging = true;
      startX = x - layer.position.x;
      startY = y - layer.position.y;
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      onUpdate({ x: x - startX, y: y - startY });
    }
  };

  const onMouseUp = () => {
    isDragging = false;
  };

  element.addEventListener('mousedown', onMouseDown);
  element.addEventListener('mousemove', onMouseMove);
  element.addEventListener('mouseup', onMouseUp);

  return () => {
    element.removeEventListener('mousedown', onMouseDown);
    element.removeEventListener('mousemove', onMouseMove);
    element.removeEventListener('mouseup', onMouseUp);
  };
};

export { createCanvas, drawCanvas, clearCanvas, drawSelectLayerOutline, enableLayerDragging };
export type { Canvas };
