import React from 'react';
import styles from '../styles/ImageCarousel.module.css';

const ImageCarousel = ({ images, deleteImage }) => {
  return (
    <div className={styles.imageCarousel}>
      {images.map((imageSrc, index) => (
        <div key={index} className={styles.imageContainer}>
          <img src={imageSrc} alt={`Upload number: ${index}`} />
          <button
            className={styles.deleteButton}
            onClick={() => deleteImage(index)}
          >
            {/* Add your trashcan icon SVG here */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M17,6a2,2 0 0,1 2,2v12a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V8a2,2 0 0,1 2,-2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;
