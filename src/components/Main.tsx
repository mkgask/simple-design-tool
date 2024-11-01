import { Component } from 'solid-js';
import Toolbar from './Toolbar';
import Canvas from './Canvas';
import LayerList from './LayerList';

const Main: Component = () => {
  return (
    <div class="flex">
      <div class="flex flex-col w-2/3 p-4">
        <div class="mb-4">
          <Toolbar />
        </div>
        <div class="flex-1 mb-4">
          <Canvas />
        </div>
      </div>
      <div class="w-1/3 p-4">
        <LayerList />
      </div>
    </div>
  );
};

export default Main;
