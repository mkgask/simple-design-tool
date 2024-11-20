import { Component, createEffect, onCleanup, onMount } from 'solid-js';
import { drawCanvas, clearCanvas, createCanvas, enableLayerDragging, drawSelectLayerOutline } from '../modules/Canvas';
import type { Canvas } from '../modules/Canvas';
import { Layer, layers, selectedLayer, setLayers } from '../modules/Layers';

const Canvas: Component = () => {
  let canvas: Canvas;
  let canvasElement: HTMLCanvasElement;
  let cleanup: CallableFunction;
  let oldSelectedLayer: Layer;

  const initializeCanvas = () => {
    if (canvasElement) {
      if (!canvas) {
        canvas = createCanvas({ x: canvasElement.width, y: canvasElement.height }, '#fff');
      }

      clearCanvas(canvas, canvasElement);
      drawCanvas(layers(), canvasElement);
      //drawSelectLayerOutline(selectedLayer(), canvasElement);

      if (selectedLayer()) {
        if (selectedLayer().id !== oldSelectedLayer?.id) {
          //if (cleanup) cleanup();

          cleanup = enableLayerDragging(selectedLayer(), canvasElement, (position) => {
            setLayers(layers().map(layer => layer.id === selectedLayer().id ? { ...layer, position } : layer));
            clearCanvas(canvas, canvasElement);
            drawCanvas(layers(), canvasElement);
            //drawSelectLayerOutline(selectedLayer(), canvasElement);
          });
        }
      }
    }
  };

  onMount(() => {
    initializeCanvas();
  });

  createEffect(() => {
    //if (cleanup) cleanup();
    initializeCanvas();
  });

  onCleanup(() => {
    if (cleanup) cleanup();
  });

  return (
    <div class="canvas">
      <canvas ref={canvasElement} width="800" height="600"></canvas>
    </div>
  );
};

export default Canvas;
