import { Component, createEffect, onMount } from 'solid-js';
import { drawCanvas, clearCanvas } from '../modules/Canvas';
import { layers } from '../modules/Layers';

const Canvas: Component = () => {
  let canvas: HTMLCanvasElement;

  onMount(() => {
    if (canvas) {
      clearCanvas({ size: { x: canvas.width, y: canvas.height } }, canvas);
      drawCanvas(layers(), canvas);
    }
  });

  createEffect(() => {
    if (canvas) {
      clearCanvas({ size: { x: canvas.width, y: canvas.height } }, canvas);
      drawCanvas(layers(), canvas);
    }
  });

  return (
    <div class="canvas">
      <canvas ref={canvas} width="800" height="600"></canvas>
    </div>
  );
};

export default Canvas;
