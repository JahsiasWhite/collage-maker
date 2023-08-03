import React, { useState } from 'react';
import './App.css';
import ImageCarousel from './components/ImageCarousel';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import CollagePreview from './components/CollagePreview';
import CollageEditor from './components/CollageEditor';
import LayoutMenu from './components/LayoutMenu';

// CONTEXT
import { CollageEditorProvider } from './components/CollageEditorContext'; // So we can talk to the editor directly, NO PROP DRILLING YAY!!

function App() {
  const [images, setImages] = useState([]);
  const [collage, setCollage] = useState(null);
  const [isCollageLayoutOpen, setIsCollageLayoutOpen] = useState(false);

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

  // Function to toggle the visibility of LayoutMenu
  const toggleCollageLayout = () => {
    setIsCollageLayoutOpen((prev) => !prev);
  };

  return (
    <div className="App">
      <Header></Header>
      <MenuBar
        handleImageUpload={handleImageUpload}
        collage={collage}
        toggleCollageLayout={toggleCollageLayout}
      />{' '}
      <CollageEditorProvider>
        <CollageEditor images={images} onEdit={handleImageEdit}></CollageEditor>
        <div className="middleContent">
          {images.length > 0 && <ImageCarousel images={images} />}
          {images.length > 0 && <CollagePreview collage={collage} />}
        </div>
        <LayoutMenu show={isCollageLayoutOpen} />
      </CollageEditorProvider>
    </div>
  );
}

export default App;
