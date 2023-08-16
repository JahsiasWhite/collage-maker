import React, { useState } from 'react';
import styles from '../styles/MenuBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

const CollageExporter = ({ onToggle }) => {
  const [downloadClicked, setDownloadClicked] = useState(false);

  const handleClick = () => {
    setDownloadClicked(!downloadClicked);
    onToggle();
  };

  return (
    <div
      className={` ${styles.menuButton} ${downloadClicked ? styles.open : ''}`}
      onClick={handleClick}
    >
      <FontAwesomeIcon className={styles.icon} icon={faFileArrowDown} />
      <div className={styles.menuLabel}>Download</div>
    </div>
  );
};

export default CollageExporter;
