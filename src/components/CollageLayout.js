import React from 'react';
// import styles from '../styles/CollageLayout.module.css';
import styles from '../styles/MenuBar.module.css';
import Icon1 from '../icons/Icon1.js';

const CollageEditor = ({ onToggle }) => {
  return (
    <div className={styles.menuButton} onClick={onToggle}>
      <div className={styles.menuIcon}>
        <Icon1></Icon1>
      </div>
      <div className={styles.menuLabel}>Layout</div>
    </div>
  );
};

export default CollageEditor;
