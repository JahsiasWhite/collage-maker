import React, { useEffect } from 'react';
import { useCollageEditor } from './CollageEditorContext';

const CollageEditor = ({ images }) => {
  // renderCanvas - ?
  // randomizeFlag - Alerts when the randomize button was ran, so we must re-render the canvas
  const { renderCanvas, randomizeFlag, mode } = useCollageEditor();

  // Call renderCanvas from the context
  // Only call this function from here if we are adding an entire new picture
  useEffect(() => {
    renderCanvas(images);
  }, [images, randomizeFlag, mode]); //! Dont use renderCanvas! CIRCULAR

  return (
    <div>
      {/* The component can be empty or contain UI elements as needed */}
    </div>
  );
};

export default CollageEditor;
