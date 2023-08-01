import React, { useState } from 'react';
import styles from '../styles/ImageUpload.module.css';

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
    <div className={styles.imageUpload}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
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
