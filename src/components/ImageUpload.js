import React from 'react';
import styles from '../styles/MenuBar.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';

const ImageUpload = ({ onImageUpload }) => {
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

  return (
    <div className={styles.menuButton}>
      <label htmlFor="file-upload" className={styles.menuLabel}>
        <FontAwesomeIcon className={styles.icon} icon={faFileArrowUp} />
        <div className={styles.menuLabel}>Upload</div>
      </label>
      <input
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
