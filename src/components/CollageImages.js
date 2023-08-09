import React, { useState } from 'react';
// import styles from '../styles/CollageLayout.module.css';
import styles from '../styles/MenuBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';

const CollageImages = ({ onToggle }) => {
  const [imagesClicked, setImagesClicked] = useState(false);

  const handleClick = () => {
    setImagesClicked(!imagesClicked);
    onToggle();
  };

  return (
    <div
      className={` ${styles.menuButton} ${imagesClicked ? styles.open : ''}`}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faImages} />
      <div className={styles.menuLabel}>Images</div>
    </div>
  );
};

export default CollageImages;
