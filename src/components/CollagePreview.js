import React from 'react';

const CollagePreview = ({ collage }) => {
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
