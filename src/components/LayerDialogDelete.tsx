import { Component } from 'solid-js';

const LayerDialogDelete: Component<{ layerName: string, layerType: string, onDelete: () => void, onClose: () => void }> = (props) => {
  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-96 p-4">
        <h2 class="text-xl font-semibold mb-4">Delete Layer</h2>
        <p>
            Are you sure you want to delete?<br />
            name: <strong>{props.layerName}</strong><br />
            type: <strong>{props.layerType}</strong><br />
            </p>
        <div class="flex justify-end mt-4">
          <button
            type="button"
            onClick={props.onClose}
            class="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={props.onDelete}
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default LayerDialogDelete;
