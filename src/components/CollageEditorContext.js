// CollageContext.js
import React, { createContext, useState, useContext } from 'react';

const CollageEditorContext = createContext();

export const useCollageEditor = () => useContext(CollageEditorContext);

export const CollageEditorProvider = ({ children }) => {
  const [collage, setCollage] = useState(null);

  /* Collage Dimensions */
  const [collageWidth, setCollageWidth] = useState(800); // Default width 800
  const [collageHeight, setCollageHeight] = useState(600); // Default height 600

  /* Layout Mode */
  const [mode, setMode] = useState('block'); // 'block' or 'freeform'

  /* Default / Block mode layout */
  const calculateBlockLayout = async (images, canvas, context) => {
    // Calculate the dimensions of each image in the collage
    const numPicturesWide = Math.ceil(Math.sqrt(images.length));
    const imageWidth = canvas.width / numPicturesWide;
    const imageHeight = canvas.height / numPicturesWide;

    // Draw each image on the canvas
    for (let i = 0; i < images.length; i++) {
      const image = new Image();
      image.src = images[i];

      // Wait for the image to load before drawing
      await new Promise((resolve) => {
        image.onload = () => resolve();
      });

      const x = (i % numPicturesWide) * imageWidth;
      const y = Math.floor(i / numPicturesWide) * imageHeight;
      context.drawImage(image, x, y, imageWidth, imageHeight);
    }

    return canvas;
  };

  /* RANDOMIZE THE ORDER OF THE PICTURES */
  const randomize = () => {
    // Implement your randomization logic here
    // console.error('HI');
  };

  /* Change the height of the collage */
  const changeHeight = (height) => {
    setCollageHeight(height);
  };

  /* Change the width of the collage */
  const changeWidth = (width) => {
    setCollageWidth(width);
  };

  const toggleMode = (mode) => {
    setMode(mode);
    // Call calculateCollageLayout here?
  };

  // Function to calculate the positions and sizes of images for 'freeform' mode
  const calculateFreeformLayout = (images) => {
    // Implement your custom logic to arrange the images in a collage-like layout
    // Calculate the positions and sizes of images based on their density in the center
    // and how much they overlap.
    // Return an array of objects containing the positions and sizes of the images.
    // For example: [{ x: 10, y: 10, width: 100, height: 100 }, ...]
    // Note: This part can be complex and may require some experimentation to get the desired result.
  };

  // Function to render the canvas based on the selected mode
  const renderCanvas = async (images) => {
    // Create a temporary canvas to draw the images
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set the canvas size to accommodate all images
    // ! BOTH THE PREVIEW Dimensions and the output dimensions
    canvas.width = collageWidth;
    canvas.height = collageHeight;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (mode === 'block') {
      // Calculate layout for 'block' mode
      await calculateBlockLayout(images, canvas, context);
      // Draw images based on blockLayout
    } else if (mode === 'freeform') {
      // Calculate layout for 'freeform' mode
      const collageLayout = calculateFreeformLayout(images);
      // Draw images based on collageLayout
    }

    // Convert the canvas to data URL
    const editedDataURL = canvas.toDataURL('image/png', 1.0);
    setCollage(editedDataURL);
  };

  return (
    <CollageEditorContext.Provider
      value={{
        collage,
        randomize,
        renderCanvas,
        changeHeight,
        changeWidth,
        mode,
        toggleMode,
      }}
    >
      {children}
    </CollageEditorContext.Provider>
  );
};
