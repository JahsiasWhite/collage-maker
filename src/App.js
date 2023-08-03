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
  // const [collage, setCollage] = useState(null);
  const [isCollageLayoutOpen, setIsCollageLayoutOpen] = useState(false);

  // Individual Images
  const handleImageUpload = (selectedImages) => {
    setImages(selectedImages);
    // setCollage(null); // Reset editedImage when new images are uploaded
  };

  // Function to toggle the visibility of LayoutMenu
  const toggleCollageLayout = () => {
    setIsCollageLayoutOpen((prev) => !prev);
  };

  return (
    <CollageEditorProvider>
      <div className="App">
        <Header></Header>
        <MenuBar
          handleImageUpload={handleImageUpload}
          toggleCollageLayout={toggleCollageLayout}
        />{' '}
        <CollageEditor images={images}></CollageEditor>
        <div className="middleContent">
          {images.length > 0 && <ImageCarousel images={images} />}
          {images.length > 0 && <CollagePreview />}
        </div>
        <LayoutMenu show={isCollageLayoutOpen} />
      </div>
    </CollageEditorProvider>
  );
}

export default App;
