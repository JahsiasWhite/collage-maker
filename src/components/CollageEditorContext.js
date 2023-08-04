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
  // State variable to hold the freeform layout
  const [collageLayoutState, setCollageLayoutState] = useState([]);

  /* Flag to tell whether an edit was made and that the canvas should be re-rendered */
  // The value doesn't matter since we use it as a toggle
  const [editMade, setEditMade] = useState(false);

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
  };

  /* RANDOMIZE THE ORDER OF THE PICTURES */
  const randomize = () => {
    setEditMade(!editMade);
  };

  /* Change the height of the collage */
  const changeHeight = (height) => {
    setCollageHeight(height);
    setEditMade(!editMade);
  };

  /* Change the width of the collage */
  const changeWidth = (width) => {
    setCollageWidth(width);
    setEditMade(!editMade);
  };

  const toggleMode = (mode) => {
    setMode(mode);
    setEditMade(!editMade);
    // Call calculateCollageLayout here?
  };

  // Function to arrange the images in a collage-like layout
  // Calculate the positions and sizes of images based on their density in the center
  // and how much they overlap.
  // Return an array of objects containing the positions and sizes of the images.
  // For example: [{ x: 10, y: 10, width: 100, height: 100 }, ...]
  const calculateFreeformLayout = (images, canvasWidth, canvasHeight) => {
    const collageLayout = [];

    // Calculates the random x and y positon of each image
    for (let i = 0; i < images.length; i++) {
      const width = 500;
      const height = 500;
      const x = Math.random() * (canvasWidth - width); // Random x position within canvas width
      const y = Math.random() * (canvasHeight - height); // Random y position within canvas height

      // Add the position and size to the collageLayout array
      collageLayout.push({ x, y, width, height });
    }

    return collageLayout;
  };

  // Uses the calculated freeformLayout to place the images on the canvas
  const drawFreeformLayout = async (images, context, freeformLayout) => {
    // Shuffle the array randomly using Fisher-Yates Shuffle algorithm
    // This randomizes the pictures in the z-direction. Preventing the same picture from being on top every time
    // for (let i = images.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [images[i], images[j]] = [images[j], images[i]];
    // }
    // console.error('RUNING');

    // Create an array of indices representing the order of images in shuffled order
    const shuffledIndices = [...Array(images.length).keys()].sort(
      () => Math.random() - 0.5
    );

    // Draw images based on collageLayout
    for (let i = 0; i < images.length; i++) {
      const image = new Image();
      // image.src = images[i];
      const imageIndex = shuffledIndices[i]; // Get the image index from shuffledIndices
      image.src = images[imageIndex]; // Access the image using the shuffled index

      // Wait for the image to load before drawing
      await new Promise((resolve) => {
        image.onload = () => resolve();
      });

      // Get the position and size from collageLayout
      const { x, y, width, height } = freeformLayout[i];

      // Draw the image on the canvas using the calculated position and size
      context.drawImage(image, x, y, width, height);
    }
  };

  // Function to render the canvas based on the selected mode
  const renderCanvas = async (images) => {
    console.error('RUNNING');
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
      const freeformLayout = calculateFreeformLayout(
        images,
        collageWidth,
        collageHeight
      );

      setCollageLayoutState(freeformLayout);
      await drawFreeformLayout(images, context, freeformLayout); // ! TODO WHATS TEH POINT OF using 'setCollageLayoutState' if i dont use the variable here?
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
        editMade,
      }}
    >
      {children}
    </CollageEditorContext.Provider>
  );
};
