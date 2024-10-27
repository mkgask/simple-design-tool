import { Component } from 'solid-js';
import { Card, Button } from 'flowbite';

const Main: Component = () => {
  return (
    <Card>
      <div class="flex flex-col p-4">
        <div class="mb-4">Toolbar Placeholder</div>
        <div class="flex-1 mb-4">Canvas Placeholder</div>
        <div>Layer List Placeholder</div>
        <Button>Click Me</Button>
      </div>
    </Card>
  );
};

export default Main;
