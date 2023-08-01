// MenuBar.js

import React from 'react';
import styles from '../styles/MenuBar.module.css';
import Icon1 from '../icons/Icon1';

const MenuBar = () => {
  const menuItems = [
    { id: 1, icon: <Icon1 />, label: 'Upload' },
    { id: 2, icon: <Icon1 />, label: 'Customize' },
    { id: 3, icon: <Icon1 />, label: 'Layout' },
    { id: 4, icon: <Icon1 />, label: 'Text' },
    { id: 5, icon: <Icon1 />, label: 'Download/Export' },
  ];

  return (
    <div className={styles.menuBar}>
      {menuItems.map((item) => (
        <button key={item.id} className={styles.menuButton}>
          <div className={styles.menuIcon}>{item.icon}</div>
          <div className={styles.menuLabel}>{item.label}</div>
        </button>
      ))}
    </div>
  );
};

export default MenuBar;
