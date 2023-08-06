// MenuBar.js

import React from 'react';
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
}) => {
  // const [isCollageLayoutOpen, setIsCollageLayoutOpen] = useState(false);

  const menuItems = [
    // { id: 2, icon: <Icon1 />, label: 'Customize' }, IDK IF I WANT THIS AT ALL?
    // { id: 4, icon: <Icon1 />, label: 'Text' },
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
      <CollageLayout onToggle={toggleCollageLayout} />
      <CollageImages onToggle={toggleImageMenu} />
      <CollageExporter />
    </div>
  );
};

export default MenuBar;
