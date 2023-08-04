import React, { useState, useEffect } from 'react';
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
  const { randomize, changeHeight, changeWidth, mode, toggleMode } =
    useCollageEditor();

  /* Handles collage dimensions */
  const handleHeightChange = (e) => {
    const newHeight = e.target.value;

    if (isNaN(newHeight)) return;
    if (newHeight === '') return;

    changeHeight(Number(newHeight));
  };

  const handleWidthChange = (e) => {
    const newWidth = e.target.value;

    if (isNaN(newWidth)) return;
    if (newWidth === '') return;

    changeHeight(Number(newWidth));
  };

  const handleReset = () => {
    changeHeight(800); // TODO Make these not hard-coded
    changeWidth(800);
  };

  /* Layout Mode */
  const handleToggleMode = () => {
    // Toggle between 'block' and 'freeform' modes
    toggleMode(mode === 'block' ? 'freeform' : 'block');
  };

  const customOptions = [
    // Define your customization options here
    // For example: { id: 1, label: 'Option 1', onClick: () => handleOptionClick(1) }
    { id: 1, label: 'Randomize', onClick: () => randomize() },
    {
      id: 2,
      label: 'Change Height',
      input: (
        <div>
          <input
            type="number"
            onChange={handleHeightChange}
            placeholder="Enter new height"
          />
        </div>
      ),
    },
    {
      id: 3,
      label: 'Change Width',
      input: (
        <div>
          <input
            type="number"
            onChange={handleWidthChange}
            placeholder="Enter new width"
          />
        </div>
      ),
    },
    {
      id: 4,
      label: 'Reset',
      onClick: handleReset,
    },
    {
      id: 5,
      label: 'Toggle Slider',
      input: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={mode === 'freeform'}
              onChange={handleToggleMode}
            />
            Freeform Mode
          </label>
        </div>
      ),
    },
  ];

  return (
    <div className={`${styles.layoutMenu} ${show ? styles.open : ''}`}>
      <ul className={styles.customOptionsList}>
        {customOptions.map((option) => (
          <li key={option.id} className={styles.customOption}>
            {option.input ? (
              option.input
            ) : (
              <button onClick={option.onClick}>{option.label}</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LayoutMenu;
