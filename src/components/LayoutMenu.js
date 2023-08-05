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
  const {
    randomize,
    changeHeight,
    changeWidth,
    mode,
    toggleMode,
    changeDistFromCenter,
    changeAngleNoise,
  } = useCollageEditor();

  // Keeps track of the 'distance from center' for freeform mode
  const [distFromCenter, setDistFromCenter] = useState(5); // Default value
  const [angleNoise, setAngleNoise] = useState(3); // Default value

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

    changeWidth(Number(newWidth));
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

  /* Freeform mode customizations */
  const handleSliderChange = (e) => {
    setDistFromCenter(Number(e.target.value));
    changeDistFromCenter(Number(e.target.value));
    console.error('WORKING');
  };
  const hangleAngleNoiseChange = (e) => {
    setAngleNoise(Number(e.target.value));
    changeAngleNoise(Number(e.target.value));
  };

  const customOptions = [
    // Define your customization options here
    // {
    //   id: 2,
    //   label: 'Change Height',
    //   input: (
    //     <div>
    //       <input
    //         className={styles.layoutInput}
    //         type="number"
    //         onChange={handleHeightChange}
    //         placeholder="Enter new height"
    //       />
    //     </div>
    //   ),
    // },
    // {
    //   id: 3,
    //   label: 'Change Width',
    //   input: (
    //     <div>
    //       <input
    //         className={styles.layoutInput}
    //         type="number"
    //         onChange={handleWidthChange}
    //         placeholder="Enter new width"
    //       />
    //     </div>
    //   ),
    // },
    // {
    //   id: 4,
    //   label: 'Reset',
    //   onClick: handleReset,
    // },
    {
      id: 5,
      label: 'Toggle Slider',
      input: (
        <div className={styles.switchContainer}>
          <input
            className={styles.toggleSwitch}
            type="checkbox"
            checked={mode === 'freeform'}
            onChange={handleToggleMode}
          />
          <label className={styles.toggleLabel}>Freeform Mode</label>
        </div>
      ),
    },

    {
      id: 6,
      label: 'Randomize',
      className: mode === 'freeform' ? '' : styles.greyedOut,
      onClick: () => randomize(),
      input: (
        <div>
          <button
            className={`${styles.layoutButton} ${
              mode === 'freeform' ? '' : styles.greyedOut
            }`}
            onClick={randomize}
          >
            Randomize
          </button>
        </div>
      ),
    },
    // {
    //   id: 7,
    //   label: 'Distance from Center',
    //   input: (
    //     <div>
    //       <input
    //         className={styles.slider}
    //         type="range"
    //         min={0}
    //         max={5}
    //         // step={0.1}
    //         onChange={handleSliderChange}
    //         disabled={mode !== 'freeform'}
    //       />
    //       {/* <span>{distanceFromCenter}</span> */}
    //     </div>
    //   ),
    //   disabled: mode !== 'freeform',
    // },
    {
      id: 8,
      label: 'Angle Noise',
      input: (
        <div>
          <div classname="inputLabel">Noise:</div>
          <input
            className={styles.slider}
            type="range"
            min={0}
            max={3}
            step={0.1}
            onChange={hangleAngleNoiseChange}
            disabled={mode !== 'freeform'}
          />
          <span>{angleNoise}</span>
        </div>
      ),
      disabled: mode !== 'freeform',
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
              <button className={styles.layoutButton} onClick={option.onClick}>
                {option.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LayoutMenu;
