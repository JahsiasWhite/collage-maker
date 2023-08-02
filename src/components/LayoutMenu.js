import React from 'react';
import styles from '../styles/LayoutMenu.module.css';

const CustomizationMenu = ({ show }) => {
  const customOptions = [
    // Define your customization options here
    // For example: { id: 1, label: 'Option 1', onClick: () => handleOptionClick(1) }
  ];

  return (
    <div className={`${styles.layoutMenu} ${show ? styles.open : ''}`}>
      <ul className={styles.customOptionsList}>
        {customOptions.map((option) => (
          <li key={option.id} className={styles.customOption}>
            <button onClick={option.onClick}>{option.label}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomizationMenu;
