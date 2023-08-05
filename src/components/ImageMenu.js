import React, { useState, useEffect } from 'react';
import styles from '../styles/LayoutMenu.module.css';

import { useCollageEditor } from './CollageEditorContext';
import ImageCarousel from './ImageCarousel';

// export options
// so we use it as options.randomize, options.border, etc...

/*
  show - boolean flag indicating wether the layout menu should be visible
  options - Future idea to reduce prop drilling
  randomize - Function from 'CollageEditor'
  */

const ImageMenu = ({ show, images, deleteImage }) => {
  const {} = useCollageEditor();

  return (
    <div className={`${styles.layoutMenu} ${show ? styles.open : ''}`}>
      {/* <ul className={styles.customOptionsList}>
        {customOptions.map((option) => (
          <li key={option.id} className={styles.customOption}>
            {option.input ? (
              option.input
            ) : (
              <button className={styles.layoutButton} onClick={option.onClick}>
                {option.label}
              </button>
            )}
          </li>
        ))}
      </ul> */}
      <div>Images Uploaded:</div>
      <ImageCarousel images={images} deleteImage={deleteImage} />
      {/* {images.length > 0 && <ImageCarousel images={images} />} */}
    </div>
  );
};

export default ImageMenu;
