import React from 'react';
import { useCollageEditor } from './CollageEditorContext';

const CollagePreview = () => {
  const { collage, collageWidth, collageHeight } = useCollageEditor();
  // TODO Put a console log here, i think this gets called too many times

  return (
    <div>
      <h2>Preview:</h2>
      <img
        src={collage}
        alt="Collage Preview"
        style={{ border: '1px solid #ccc', margin: '10px 0' }}
      />
      <div>
        {collageWidth} x {collageHeight}
      </div>
    </div>
  );
};

export default CollagePreview;
