import React from 'react';
import styles from '../styles/MenuBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

import { useCollageEditor } from './CollageEditorContext';

const CollageExporter = () => {
  const { collage } = useCollageEditor();

  // SVG EXPORT
  const handleExport = () => {
    if (collage) {
      const svgMarkup = getSVGMarkup(collage);

      // Convert the SVG markup to a Blob
      const blob = new Blob([svgMarkup], { type: 'image/svg+xml' });

      // Create a downloadable link for the SVG file
      const link = document.createElement('a');
      link.download = 'collage.svg';
      link.href = URL.createObjectURL(blob);
      link.click();
    }
  };

  // Turns the data URL into an SVG markup
  const getSVGMarkup = (collage) => {
    const svgWidth = 400;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', svgWidth); // Set the desired width for the SVG
    const collageWidth = Math.ceil(Math.sqrt(collage.length));
    svg.setAttribute('height', (svgWidth / collageWidth) * collageWidth);

    const svgImage = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'image'
    );
    svgImage.setAttribute('x', 0);
    svgImage.setAttribute('y', 0);
    svgImage.setAttribute('width', svgWidth);
    svgImage.setAttribute('height', svgWidth);
    svgImage.setAttribute('href', collage);

    svg.appendChild(svgImage);

    // Serialize the SVG element to a string
    const serializer = new XMLSerializer();
    return serializer.serializeToString(svg);
  };

  return (
    // <div>
    //   <button onClick={handleExport}>Export Collage</button>
    // </div>
    <div className={styles.menuButton} onClick={handleExport}>
      <FontAwesomeIcon className={styles.icon} icon={faFileArrowDown} />
      <div className={styles.menuLabel}>Download</div>
    </div>
  );
};

export default CollageExporter;
