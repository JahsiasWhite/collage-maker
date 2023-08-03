import React from 'react';
import { useCollageEditor } from './CollageEditorContext';

const CollagePreview = () => {
  const { collage } = useCollageEditor();

  return (
    <div>
      <h2>Preview:</h2>
      <img
        src={collage}
        alt="Collage Preview"
        style={{ border: '1px solid #ccc', margin: '10px 0' }}
      />
    </div>
  );
};

export default CollagePreview;
