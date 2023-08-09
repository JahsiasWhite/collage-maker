import React, { useRef } from 'react';
import styles from '../styles/LargeImageUpload.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';

const ImageUpload = ({ onImageUpload }) => {
  //TODO put this in a context right?? It is a duplicate of ImageUpload

  const handleImageChange = (event) => {
    const files = event.target.files;
    const selectedImagesArray = [];

    const loadImage = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.readAsDataURL(file);
      });
    };

    const loadImageUrls = async () => {
      const imagePromises = [];
      for (let i = 0; i < files.length; i++) {
        imagePromises.push(loadImage(files[i]));
      }

      const loadedImages = await Promise.all(imagePromises);
      selectedImagesArray.push(...loadedImages);
      return selectedImagesArray;
    };

    loadImageUrls().then((newImages) => {
      // New images is an array of strings the size of uploaded images
      onImageUpload(newImages);
    });
  };

  /* So the entire button can act as the <input> */
  const fileInputRef = useRef(null);
  const handleMenuButtonClick = () => {
    fileInputRef.current.click(); // Trigger click on the input element
  };

  return (
    <div className={styles.menuButton} onClick={handleMenuButtonClick}>
      <FontAwesomeIcon icon={faFileArrowUp} className={styles.icon} />
      <label htmlFor="file-upload" className={styles.menuLabel}>
        <div className={styles.menuLabel}>Upload</div>
      </label>
      <input
        ref={fileInputRef}
        id="file-upload"
        className={styles.menuItemInput}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUpload;
