import React, { useState, useEffect } from 'react';
import styles from '../styles/LoadingScreen.module.css';
import logo from '../icons/logo.svg';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setFadeOut(true);
    }, 1000); // Adjust the delay as needed

    // Clear timeout if the component is unmounted or fading out
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (fadeOut) {
      // Wait for the fading animation to finish
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 1000); // Adjust the delay to match your CSS transition duration

      return () => clearTimeout(timeout);
    }
  }, [fadeOut]);

  if (loading) {
    return (
      <div
        className={`${styles.loadingScreen} ${
          fadeOut ? styles.doneLoading : ''
        }`}
      >
        <img className={styles.logo} src={logo} alt="App Logo"></img>
        <div className={styles.loadingScreenText}>Photo Collage Maker</div>
      </div>
    );
  }

  return null;
};

export default LoadingScreen;
