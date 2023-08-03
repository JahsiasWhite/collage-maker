import React, { useEffect } from 'react';
import { useCollageEditor } from './CollageEditorContext';

const CollageEditor = ({ images }) => {
  const { renderCanvas } = useCollageEditor();

  // Call renderCanvas from the context
  // Only call this function from here if we are adding an entire new picture
  useEffect(() => {
    renderCanvas(images);
  }, [images, renderCanvas]); // is onEdit still needed here?, is renderCanvas redundant?

  return (
    <div>
      {/* The component can be empty or contain UI elements as needed */}
    </div>
  );
};

export default CollageEditor;
