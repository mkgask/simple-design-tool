import { Component, onMount } from 'solid-js';
import { renderVectorDataOnCanvas } from '../modules/Layers';

const LayerThumbnail: Component<{ vectorData: any }> = (props) => {
  let canvas: HTMLCanvasElement;

  onMount(() => {
    if (canvas && props.vectorData) {
      renderVectorDataOnCanvas(canvas, props.vectorData);
    }
  });

  return <canvas ref={canvas} width="48" height="24" />;
};

export default LayerThumbnail;
