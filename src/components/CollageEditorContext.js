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

  // State variable to track if the collage layout needs to be recalculated
  const [recalculateLayout, setRecalculateLayout] = useState(true);

  // Function to trigger the recalculation of the freeform layout
  const triggerRecalculateLayout = () => {
    setRecalculateLayout(true);
  };

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

  // Function to arrange the images in a collage-like layout
  // Calculate the positions and sizes of images based on their density in the center
  // and how much they overlap.
  // Return an array of objects containing the positions and sizes of the images.
  // For example: [{ x: 10, y: 10, width: 100, height: 100 }, ...]
  const calculateFreeformLayout = (images, canvasWidth, canvasHeight) => {
    const collageLayout = [];

    //TODO something with this ?
    // const maxPhotoWidth = 600;
    // const minPhotoWidth = 200;
    // const photoWidthMultiplier = maxPhotoWidth - minPhotoWidth;

    for (let i = 0; i < images.length; i++) {
      // Generate random positions and sizes for each image
      // const width = Math.random() * photoWidthMultiplier + minPhotoWidth; // Random width between 50 and 150,
      // const height = Math.random() * 100 + 50; // Random height between 50 and 150
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
    // Draw images based on collageLayout
    for (let i = 0; i < images.length; i++) {
      const image = new Image();
      image.src = images[i];

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
      if (recalculateLayout) {
        // Calculate layout for 'freeform' mode
        const freeformLayout = calculateFreeformLayout(
          images,
          collageWidth,
          collageHeight
        );
        console.error(freeformLayout);
        // Save the freeform layout in a state variable (collageLayoutState)
        setCollageLayoutState(freeformLayout);

        setRecalculateLayout(false); // Reset the recalculateLayout flag
        await drawFreeformLayout(images, context, freeformLayout); // ! TODO WHATS TEH POINT OF using 'setCollageLayoutState' if i dont use the variable here?
      } else {
        // So this 'else' is ugly but I didn't find a way around this
        // This functions gets called too many times so recalculateLayout ends up turning false too early
        // Without this, we get stuck in an infinite loop of the images constantly updating and moving around
        if (images.length !== collageLayoutState.length) {
          // setCollageLayoutState also doesn't update fast enough which leads to this discrepancy
          // so we have to recalculate the layout again :(
          const freeformLayout = calculateFreeformLayout(
            images,
            collageWidth,
            collageHeight
          );
          setCollageLayoutState(freeformLayout);
          await drawFreeformLayout(images, context, freeformLayout);
        } else {
          await drawFreeformLayout(images, context, collageLayoutState);
        }
      }
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
        triggerRecalculateLayout,
      }}
    >
      {children}
    </CollageEditorContext.Provider>
  );
};
