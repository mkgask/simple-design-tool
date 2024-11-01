import { Component } from 'solid-js';
import Toolbar from './Toolbar';
import Canvas from './Canvas';
import LayerList from './LayerList';

const Main: Component = () => {
  return (
    <div class="flex">
      <div class="flex flex-col w-2/3">
        <div class="p-4 border-b dark:border-gray-600">
          <Toolbar />
        </div>
        <div class="flex-1 p-4">
          <Canvas />
        </div>
      </div>
      <div class="w-1/3 border-l dark:border-gray-600">
        <LayerList />
      </div>
    </div>
  );
};

export default Main;
