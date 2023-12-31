import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import CollagePreview from './components/CollagePreview';
import CollageEditor from './components/CollageEditor';
import LayoutMenu from './components/LayoutMenu';
import ImageMenu from './components/ImageMenu';
import MainUploader from './components/MainUploader';
import LoadingScreen from './components/LoadingScreen';
import DownloadMenu from './components/DownloadMenu';

// CONTEXT
import { CollageEditorProvider } from './components/CollageEditorContext'; // So we can talk to the editor directly, NO PROP DRILLING YAY!!

function App() {
  const [images, setImages] = useState([]);
  // const [collage, setCollage] = useState(null);

  const [isCollageLayoutOpen, setIsCollageLayoutOpen] = useState(false);
  const [isImageMenuOpen, setIsImageMenuOpen] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);

  // Individual Images
  const handleImageUpload = (uploadedImages) => {
    let newImages = [...images];

    // Loop through every image uploaded and add it to our list of images
    for (let i = 0; i < uploadedImages.length; i++) {
      newImages.push(uploadedImages[i]);
    }
    setImages(newImages);

    // setCollage(null); // Reset editedImage when new images are uploaded
  };

  const handleDeleteImage = (idx) => {
    // Create a new array without the image at the given index
    const newImages = images.filter((_, index) => index !== idx);

    // Update the state with the new array of images
    setImages(newImages);
  };

  // Function to toggle the visibility of LayoutMenu
  const toggleCollageLayout = () => {
    setIsCollageLayoutOpen((prev) => !prev);
  };

  // Function to toggle the visibility of ImageMenu
  const toggleImageMenu = () => {
    setIsImageMenuOpen((prev) => !prev);
  };

  // Function to toggle the visibility of DownloadMenu
  const toggleDownloadMenu = () => {
    setIsDownloadMenuOpen((prev) => !prev);
  };

  return (
    <CollageEditorProvider>
      <div className="App">
        <LoadingScreen></LoadingScreen>
        <Header></Header>
        <MenuBar
          handleImageUpload={handleImageUpload}
          toggleCollageLayout={toggleCollageLayout}
          toggleImageMenu={toggleImageMenu}
          toggleDownloadMenu={toggleDownloadMenu}
        />{' '}
        <CollageEditor images={images}></CollageEditor>
        <div className="middleContent">
          {images.length === 0 && (
            // <div className="mainUploader">
            <MainUploader onImageUpload={handleImageUpload} />
            // </div>
          )}
          {images.length > 0 && <CollagePreview />}
        </div>
        <LayoutMenu show={isCollageLayoutOpen} />
        <ImageMenu
          show={isImageMenuOpen}
          images={images}
          deleteImage={handleDeleteImage}
        />
        <DownloadMenu show={isDownloadMenuOpen}></DownloadMenu>
      </div>
    </CollageEditorProvider>
  );
}

export default App;
