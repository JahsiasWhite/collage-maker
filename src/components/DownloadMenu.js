import styles from '../styles/LayoutMenu.module.css';

import { useCollageEditor } from './CollageEditorContext';

const DownloadMenu = ({ show }) => {
  const { collage } = useCollageEditor();

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

  const handleExportSvg = () => {
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
  /* I think collage is a png? */
  const handleExportPng = () => {
    fetch(collage)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], 'sample.png', { type: blob.type });

        // Create a downloadable link for the File object
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = 'collage.png';

        // Programmatically click on the link to trigger download
        link.click();

        // Clean up URL.createObjectURL() resources
        URL.revokeObjectURL(link.href);
      });
  };

  return (
    <div className={`${styles.layoutMenu} ${show ? styles.open : ''}`}>
      <button className={styles.exportButton} onClick={handleExportSvg}>
        Export as SVG
      </button>
      <button className={styles.exportButton} onClick={handleExportPng}>
        Export as PNG
      </button>
    </div>
  );
};

export default DownloadMenu;
