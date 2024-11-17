import { Component, createEffect, onMount } from 'solid-js';
import { drawCanvas, clearCanvas, createCanvas } from '../modules/Canvas';
import type { Canvas } from '../modules/Canvas';
import { layers } from '../modules/Layers';

const Canvas: Component = () => {
  let canvas: Canvas;
  let canvasElement: HTMLCanvasElement;

  onMount(() => {
    if (canvasElement) {
      if (!canvas) {
        canvas = createCanvas({ x: canvasElement.width, y: canvasElement.height }, '#fff');
      }

      clearCanvas(canvas, canvasElement);
      drawCanvas(layers(), canvasElement);
    }
  });

  createEffect(() => {
    if (canvasElement) {
      if (!canvas) {
        canvas = createCanvas({ x: canvasElement.width, y: canvasElement.height }, '#fff');
      }

      clearCanvas(canvas, canvasElement);
      drawCanvas(layers(), canvasElement);
    }
  });

  return (
    <div class="canvas">
      <canvas ref={canvasElement} width="800" height="600"></canvas>
    </div>
  );
};

export default Canvas;
