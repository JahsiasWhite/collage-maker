import React from 'react';
import styles from '../styles/ImageCarousel.module.css';

const ImageCarousel = ({ images }) => {
  return (
    <div className={styles.imageCarousel}>
      {images.map((imageSrc, index) => (
        <img key={index} src={imageSrc} alt={`Upload number: ${index}`} />
      ))}
    </div>
  );
};

export default ImageCarousel;
