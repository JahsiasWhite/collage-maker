// MenuBar.js

import React, { useState } from 'react';
import styles from '../styles/MenuBar.module.css';

// BUTTONS TODO RENAME
import ImageUpload from '../components/ImageUpload';
import CollageExporter from '../components/CollageExporter';
import CollageLayout from '../components/CollageLayout';
import CollageImages from '../components/CollageImages';

const MenuBar = ({
  handleImageUpload,
  toggleCollageLayout,
  toggleImageMenu,
  toggleDownloadMenu,
}) => {
  return (
    <div className={styles.menuBar}>
      <ImageUpload onImageUpload={handleImageUpload} />
      <CollageLayout onToggle={toggleCollageLayout} />
      <CollageImages onToggle={toggleImageMenu} />
      <CollageExporter onToggle={toggleDownloadMenu} />
    </div>
  );
};

export default MenuBar;
