// MenuBar.js

import React from 'react';
import styles from '../styles/MenuBar.module.css';
import Icon1 from '../icons/Icon1';

const MenuBar = () => {
  const menuItems = [
    { id: 1, icon: <Icon1 />, label: 'Button 1' },
    { id: 2, icon: <Icon1 />, label: 'Button 2' },
    { id: 3, icon: <Icon1 />, label: 'Button 3' },
    { id: 4, icon: <Icon1 />, label: 'Button 4' },
    { id: 5, icon: <Icon1 />, label: 'Button 5' },
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
