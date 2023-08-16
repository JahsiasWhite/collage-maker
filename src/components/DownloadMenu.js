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
  const handleExportPng = () => {};

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
