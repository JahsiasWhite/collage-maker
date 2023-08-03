// CollageContext.js
import React, { createContext, useState, useContext } from 'react';

const CollageEditorContext = createContext();

export const useCollageEditor = () => useContext(CollageEditorContext);

export const CollageEditorProvider = ({ children }) => {
  const [collage, setCollage] = useState(null);

  /* EDITED / FINAL COLLAGE */
  const renderCanvas = async (images) => {
    // Create a temporary canvas to draw the images
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set the canvas size to accommodate all images
    // ! BOTH THE PREVIEW Dimensions and the output dimensions
    canvas.width = 800; // Set the desired width for the preview canvas
    const collageWidth = Math.ceil(Math.sqrt(images.length));
    canvas.height = (canvas.width / collageWidth) * collageWidth;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the dimensions of each image in the collage
    // ! TODO NEED to fix this, each image shouldn't be the same size
    const imageWidth = canvas.width / collageWidth;
    const imageHeight = canvas.height / collageWidth;

    // Draw each image on the canvas
    for (let i = 0; i < images.length; i++) {
      const image = new Image();
      image.src = images[i];

      // Wait for the image to load before drawing
      await new Promise((resolve) => {
        image.onload = () => resolve();
      });

      const x = (i % collageWidth) * imageWidth;
      const y = Math.floor(i / collageWidth) * imageHeight;
      context.drawImage(image, x, y, imageWidth, imageHeight);
    }

    // Convert the canvas to data URL
    const editedDataURL = canvas.toDataURL('image/png', 1.0);
    setCollage(editedDataURL);
  };

  /* RANDOMIZE THE ORDER OF THE PICTURES */
  const randomize = () => {
    // Implement your randomization logic here
    // console.log('Randomize function called!');
    console.error('HI');
  };

  return (
    <CollageEditorContext.Provider value={{ collage, randomize, renderCanvas }}>
      {children}
    </CollageEditorContext.Provider>
  );
};
