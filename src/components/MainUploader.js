import React from 'react';
import styles from '../styles/MainUploader.module.css';
import LargeImageUpload from './LargeImageUpload.js';
import logo from '../icons/logo.svg';

const MainUploader = ({ onImageUpload }) => {
  return (
    <div className={styles.uploadContainer}>
      <div className={styles.uploadTitle}>Add some photos!</div>
      <LargeImageUpload onImageUpload={onImageUpload} />
      <div className={styles.uploadDescription}>
        For more customization, use the menu on the left
      </div>
    </div>
  );
};

export default MainUploader;
