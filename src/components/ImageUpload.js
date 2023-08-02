import React, { useState } from 'react';
// import styles from '../styles/ImageUpload.module.css';
import styles from '../styles/MenuButton.module.css';
import Icon1 from '../icons/Icon1';

const ImageUpload = ({ onImageUpload }) => {
  const [selectedImages, setSelectedImages] = useState([]);

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
      setSelectedImages((prevSelectedImages) => [
        ...prevSelectedImages,
        ...newImages,
      ]);
      onImageUpload([...selectedImages, ...newImages]);
    });
  };

  return (
    <div className={styles.menuButton}>
      {/* <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      /> */}
      {/* <button className={styles.menuButton}>
        <div className={styles.menuIcon}>
          <Icon1 />
        </div>
        <div className={styles.menuLabel}>Upload</div>
      </button> */}
      <label for="file-upload" class={styles.menuLabel}>
        {/* Custom Upload */}
        <div className={styles.menuIcon}>
          <Icon1 />
        </div>
        <div className={styles.menuLabel}>Upload</div>
      </label>
      <input
        id="file-upload"
        className={styles.menuItemInput}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      ></input>

      {/* {selectedImages.length > 0 && (
        <div>
          <h2>Selected Images:</h2>
          <div className="image-preview">
            {selectedImages.map((imageSrc, index) => (
              <img key={index} src={imageSrc} alt={`Upload number: ${index}`} />
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ImageUpload;
