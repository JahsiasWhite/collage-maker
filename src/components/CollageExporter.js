import React, { useRef, useEffect, useState } from 'react';

const CollageExporter = ({ images }) => {
  const [canvasDataURL, setCanvasDataURL] = useState(null);
  const canvasRef = useRef(null);
  const [needsRender, setNeedsRender] = useState(true); // Flag to track if re-render is needed
  const shuffledImagesRef = useRef([]);

  useEffect(() => {
    // Set needsRender to true when images change
    setNeedsRender(true);

    // Shuffle the images array and store it in the shuffledImagesRef
    const shuffledImages = shuffleArray(images);
    shuffledImagesRef.current = shuffledImages;
  }, [images]);

  useEffect(() => {
    const renderCanvas = async () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set the canvas size to accommodate all images
      // ! BOTH THE PREVIEW DImensions and the output dimensions
      canvas.width = 800; // Set the desired width for the preview canvas
      const collageWidth = Math.ceil(Math.sqrt(images.length));
      canvas.height = (canvas.width / collageWidth) * collageWidth;

      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Get the shuffled images from shuffledImagesRef
      const shuffledImages = shuffledImagesRef.current;

      // Calculate the dimensions of each image in the collage
      // ! TODO NEED to fix this, each image shouldnt be the same size
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
      const imageURL = canvas.toDataURL('image/png', 1.0);
      setCanvasDataURL(imageURL);
    };

    // Only render if a new image is uploaded
    if (needsRender) {
      renderCanvas();
      setNeedsRender(false);
    }
  }, [needsRender, images]);

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

  // PNG EXPORT
  //   const handleExport = () => {
  //     if (canvasDataURL) {
  //       // Trigger download
  //       const link = document.createElement('a');
  //       link.download = 'collage.png';
  //       link.href = canvasDataURL;
  //       link.click();
  //     }
  //   };

  // SVG EXPORT
  const handleExport = () => {
    // Get the shuffled images from shuffledImagesRef
    const shuffledImages = shuffledImagesRef.current;

    if (shuffledImages && shuffledImages.length > 0) {
      const svgMarkup = getSVGMarkup(shuffledImages);

      // Convert the SVG markup to a Blob
      const blob = new Blob([svgMarkup], { type: 'image/svg+xml' });

      // Create a downloadable link for the SVG file
      const link = document.createElement('a');
      link.download = 'collage.svg';
      link.href = URL.createObjectURL(blob);
      link.click();
    }
  };

  const getSVGMarkup = (shuffledImages) => {
    const svgWidth = 400;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', svgWidth); // Set the desired width for the SVG
    const collageWidth = Math.ceil(Math.sqrt(shuffledImages.length));
    svg.setAttribute('height', (svgWidth / collageWidth) * collageWidth);

    // Create an image element for each image in the collage
    const imageWidth = svgWidth / collageWidth;
    const imageHeight = svgWidth / collageWidth;

    for (let i = 0; i < shuffledImages.length; i++) {
      const x = (i % collageWidth) * imageWidth;
      const y = Math.floor(i / collageWidth) * imageHeight;

      const svgImage = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'image'
      );
      console.error(x, y, imageWidth, imageHeight);
      svgImage.setAttribute('x', x);
      svgImage.setAttribute('y', y);
      svgImage.setAttribute('width', imageWidth);
      svgImage.setAttribute('height', imageHeight);
      svgImage.setAttribute('href', shuffledImages[i]);

      svg.appendChild(svgImage);
    }

    // Serialize the SVG element to a string
    const serializer = new XMLSerializer();
    return serializer.serializeToString(svg);
  };

  //   useEffect(() => {
  //     console.error(needsRender);
  //     if (needsRender) {
  //       renderCanvas();
  //       setNeedsRender(false);
  //     }
  //   }, [needsRender, images, renderCanvas]); // Only render when needsRender is true and images change

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
