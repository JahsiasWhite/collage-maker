import React, { useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import CollageDisplay from './components/CollageDisplay';
import Header from './components/Header';
import MenuBar from './components/MenuBar';

function App() {
  const [images, setImages] = useState([]);

  const handleImageUpload = (selectedImages) => {
    setImages(selectedImages);
  };

  return (
    <div className="App">
      <Header></Header>
      <MenuBar /> {/* Render the MenuBar component */}
      <ImageUpload onImageUpload={handleImageUpload} />
      {images.length > 0 && <CollageDisplay images={images} />}
    </div>
  );
}

export default App;
