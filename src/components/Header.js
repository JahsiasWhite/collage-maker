import React from 'react';
import styles from '../styles/Header.module.css';
import logo from '../icons/logo.svg';

const Header = () => {
  return (
    <div className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.title}>Photo Collage Maker</div>
    </div>
  );
};

export default Header;
