import React, { useEffect } from 'react';
import { useCollageEditor } from './CollageEditorContext';

const CollageEditor = ({ images }) => {
  // renderCanvas - ?
  // editMade - Alerts when a customization was used and the canvas needs to be re-rendered
  const { renderCanvas, editMade } = useCollageEditor();

  // Call renderCanvas from the context
  // Only call this function from here if we are adding an entire new picture
  useEffect(() => {
    renderCanvas(images);
  }, [images, editMade]); //! Dont use renderCanvas! CIRCULAR

  return (
    <div>
      {/* The component can be empty or contain UI elements as needed */}
    </div>
  );
};

export default CollageEditor;
