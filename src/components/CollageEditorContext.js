// CollageContext.js
import React, { createContext, useState, useContext } from 'react';

const CollageEditorContext = createContext();

export const useCollageEditor = () => useContext(CollageEditorContext);

export const CollageEditorProvider = ({ children }) => {
  const [collage, setCollage] = useState(null);

  const randomize = () => {
    // Implement your randomization logic here
    // console.log('Randomize function called!');
    console.error('HI');
  };

  return (
    <CollageEditorContext.Provider value={{ collage, setCollage, randomize }}>
      {children}
    </CollageEditorContext.Provider>
  );
};
