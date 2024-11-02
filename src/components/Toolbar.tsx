import { Component } from 'solid-js';
import ToolbarRegistrationShape from './ToolbarRegistrationShape';

const Toolbar: Component = () => {
  return (
    <div class="toolbar">
      <ToolbarRegistrationShape />
      <button class="btn">Button 2</button>
      <button class="btn">Button 3</button>
    </div>
  );
};

export default Toolbar;
