import React from 'react';
import { useCollageEditor } from './CollageEditorContext';
import styles from '../styles/CollagePreview.module.css';

const CollagePreview = () => {
  const { collage, collageWidth, collageHeight } = useCollageEditor();
  // TODO Put a console log here, i think this gets called too many times

  return (
    <div>
      <h2 className={styles.title}>Preview:</h2>
      <img
        className={styles.imgPreview}
        src={collage}
        alt="Collage Preview"
        style={{ border: '1px solid #ccc', margin: '10px 0' }}
      />
      <div className={styles.dimensions}>
        {collageWidth} x {collageHeight}
      </div>
    </div>
  );
};

export default CollagePreview;
