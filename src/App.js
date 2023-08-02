import React, { useState } from 'react';
import './App.css';
import ImageCarousel from './components/ImageCarousel';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import CollageExporter from './components/CollageExporter';
import CollagePreview from './components/CollagePreview';
import CollageEditor from './components/CollageEditor';

function App() {
  const [images, setImages] = useState([]);
  const [collage, setCollage] = useState(null);

  // Individual Images
  const handleImageUpload = (selectedImages) => {
    setImages(selectedImages);
    setCollage(null); // Reset editedImage when new images are uploaded
  };

  // Saved Collage
  // collage - Edited canvas as data URL
  const handleImageEdit = (collage) => {
    setCollage(collage);
  };

  return (
    <div className="App">
      <Header></Header>
      <MenuBar handleImageUpload={handleImageUpload} />{' '}
      <CollageEditor images={images} onEdit={handleImageEdit}></CollageEditor>
      <div className="middleContent">
        {images.length > 0 && <ImageCarousel images={images} />}
        {images.length > 0 && <CollagePreview collage={collage} />}
        {images.length > 0 && <CollageExporter collage={collage} />}
      </div>
    </div>
  );
}

export default App;
