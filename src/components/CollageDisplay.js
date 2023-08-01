import React from 'react';
import styles from '../styles/CollageDisplay.module.css';

const CollageDisplay = ({ images }) => {
  return (
    <div className={styles.collageDisplay}>
      {images.map((imageSrc, index) => (
        <img key={index} src={imageSrc} alt={`Upload number: ${index}`} />
      ))}
    </div>
  );
};

export default CollageDisplay;
