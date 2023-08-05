// MenuBar.js

import React from 'react';
import styles from '../styles/MenuBar.module.css';
import Icon1 from '../icons/Icon1';

// BUTTONS TODO RENAME
import ImageUpload from '../components/ImageUpload';
import CollageExporter from '../components/CollageExporter';
import CollageLayout from '../components/CollageLayout';

const MenuBar = ({ handleImageUpload, toggleCollageLayout }) => {
  // const [isCollageLayoutOpen, setIsCollageLayoutOpen] = useState(false);

  const menuItems = [
    // { id: 2, icon: <Icon1 />, label: 'Customize' }, IDK IF I WANT THIS AT ALL?
    { id: 4, icon: <Icon1 />, label: 'Text' },
    // { id: 5, icon: <Icon1 />, label: 'Download/Export' },
    // { id: 6, icon: <ImageUpload onImageUpload={handleImageUpload} /> },
  ];

  return (
    <div className={styles.menuBar}>
      {menuItems.map((item) => (
        <button key={item.id} className={styles.menuButton}>
          <div className={styles.menuIcon}>{item.icon}</div>
          <div className={styles.menuLabel}>{item.label}</div>
        </button>
      ))}
      <ImageUpload onImageUpload={handleImageUpload} />
      <CollageExporter />

      {/* <button className={styles.menuButton} onClick={toggleCollageLayout}>
        <div className={styles.menuIcon}>
        </div>
        <div className={styles.menuLabel}>Customize</div>
      </button> */}
      <CollageLayout onToggle={toggleCollageLayout} />
    </div>
  );
};

export default MenuBar;
