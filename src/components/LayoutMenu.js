import React from 'react';
import styles from '../styles/LayoutMenu.module.css';
import { useCollageEditor } from './CollageEditorContext';

// export options
// so we use it as options.randomize, options.border, etc...

/*
  show - boolean flag indicating wether the layout menu should be visible
  options - Future idea to reduce prop drilling
  randomize - Function from 'CollageEditor'
  */

const LayoutMenu = ({ show, options }) => {
  const { randomize } = useCollageEditor(); //

  const customOptions = [
    // Define your customization options here
    // For example: { id: 1, label: 'Option 1', onClick: () => handleOptionClick(1) }
    { id: 1, label: 'Randomize', onClick: () => randomize() },
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

export default LayoutMenu;
