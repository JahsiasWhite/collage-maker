import React, { useState } from 'react';
// import styles from '../styles/CollageLayout.module.css';
import styles from '../styles/MenuBar.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from '@fortawesome/free-solid-svg-icons';

//TODO RENAME this to COllageLayout??
const CollageEditor = ({ onToggle }) => {
  const [layoutClicked, setLayoutClicked] = useState(false);

  const handleClick = () => {
    setLayoutClicked(!layoutClicked);
    onToggle();
  };

  return (
    <div
      className={` ${styles.menuButton} ${layoutClicked ? styles.open : ''}`}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faGears} />
      <div className={styles.menuLabel}>Layout</div>
    </div>
  );
};

export default CollageEditor;
