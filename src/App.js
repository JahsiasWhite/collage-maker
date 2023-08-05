import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import CollagePreview from './components/CollagePreview';
import CollageEditor from './components/CollageEditor';
import LayoutMenu from './components/LayoutMenu';
import ImageMenu from './components/ImageMenu';

// CONTEXT
import { CollageEditorProvider } from './components/CollageEditorContext'; // So we can talk to the editor directly, NO PROP DRILLING YAY!!

function App() {
  const [images, setImages] = useState([]);
  // const [collage, setCollage] = useState(null);
  const [isCollageLayoutOpen, setIsCollageLayoutOpen] = useState(false);
  const [isImageMenuOpen, setIsImageMenuOpen] = useState(false);

  // Individual Images
  const handleImageUpload = (uploadedImage) => {
    let newImages = [...images];
    newImages.push(uploadedImage);
    setImages(newImages);

    // setCollage(null); // Reset editedImage when new images are uploaded
  };

  // Function to toggle the visibility of LayoutMenu
  const toggleCollageLayout = () => {
    setIsCollageLayoutOpen((prev) => !prev);
  };

  // Function to toggle the visibility of ImageMenu
  const toggleImageMenu = () => {
    setIsImageMenuOpen((prev) => !prev);
  };

  return (
    <CollageEditorProvider>
      <div className="App">
        <Header></Header>
        <MenuBar
          handleImageUpload={handleImageUpload}
          toggleCollageLayout={toggleCollageLayout}
          toggleImageMenu={toggleImageMenu}
        />{' '}
        <CollageEditor images={images}></CollageEditor>
        <div className="middleContent">
          {images.length > 0 && <CollagePreview />}
        </div>
        <LayoutMenu show={isCollageLayoutOpen} />
        <ImageMenu show={isImageMenuOpen} images={images} />
      </div>
    </CollageEditorProvider>
  );
}

export default App;
