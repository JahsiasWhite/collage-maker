import React, { useState, useEffect } from 'react';
import styles from '../styles/ImageCarousel.module.css';

const ImageCarousel = ({ images, deleteImage }) => {
  // TODO FIX THIS ! SHOULD NOT RUN SO MANY TIMES
  // Not becuase of the useEffect, was happing prior to it
  // For example: When uploading, this runs twice before renderCanvas() and twice again after

  const [imageDimensions, setImageDimensions] = useState([]);

  useEffect(() => {
    const calculateImageDimensions = async () => {
      const dimensions = await Promise.all(
        images.map(async (imageSrc) => {
          const img = new Image();
          img.src = imageSrc;
          await img.decode();
          return { width: img.width, height: img.height };
        })
      );
      setImageDimensions(dimensions);
    };

    calculateImageDimensions();
  }, [images]);

  return (
    <div className={styles.imageCarousel}>
      {images.map((imageSrc, index) => (
        <div key={index} className={styles.imageContainer}>
          <img src={imageSrc} alt={`Upload number: ${index}`} />
          <button
            className={styles.deleteButton}
            onClick={() => deleteImage(index)}
          >
            <div className={styles.imageDimensions}>
              {imageDimensions[index] &&
                `${imageDimensions[index].width}px x ${imageDimensions[index].height}px`}
            </div>
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
