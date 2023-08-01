import React, { useRef, useEffect, useState } from 'react';

const CollageExporter = ({ images }) => {
  const [canvasDataURL, setCanvasDataURL] = useState(null);
  const canvasRef = useRef(null);
  const [needsRender, setNeedsRender] = useState(true); // Flag to track if re-render is needed

  useEffect(() => {
    console.error(needsRender);
    if (needsRender) {
      renderCanvas();
      setNeedsRender(false);
    }
  }, [needsRender, images]); // Only render when needsRender is true and images change

  useEffect(() => {
    // Set needsRender to true when images change
    setNeedsRender(true);
  }, [images]);

  const renderCanvas = async () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set the canvas size to accommodate all images
    canvas.width = 400; // Set the desired width for the preview canvas
    const collageWidth = Math.ceil(Math.sqrt(images.length));
    canvas.height = (canvas.width / collageWidth) * collageWidth;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Shuffle the images array to get a random order
    const shuffledImages = shuffleArray(images);

    // Calculate the dimensions of each image in the collage
    const imageWidth = canvas.width / collageWidth;
    const imageHeight = canvas.height / collageWidth;

    // Draw each image on the canvas
    for (let i = 0; i < shuffledImages.length; i++) {
      const image = new Image();
      image.src = shuffledImages[i];
      await image.onload; // Wait for the image to load before drawing
      const x = (i % collageWidth) * imageWidth;
      const y = Math.floor(i / collageWidth) * imageHeight;
      context.drawImage(image, x, y, imageWidth, imageHeight);
    }

    // Convert the canvas to data URL
    const imageURL = canvas.toDataURL('image/png');
    setCanvasDataURL(imageURL);
  };

  // Function to shuffle the array randomly
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleExport = () => {
    if (canvasDataURL) {
      // Trigger download
      const link = document.createElement('a');
      link.download = 'collage.png';
      link.href = canvasDataURL;
      link.click();
    }
  };

  return (
    <div>
      <button onClick={handleExport}>Export Collage</button>
      <div style={{ display: canvasDataURL ? 'block' : 'none' }}>
        <h2>Preview:</h2>
        <canvas
          ref={canvasRef}
          style={{ border: '1px solid #ccc', margin: '10px 0' }}
        />
      </div>
    </div>
  );
};

export default CollageExporter;
