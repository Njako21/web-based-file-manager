// src/components/DirectoryImages.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageOverlay from '../overlay/ImageOverlay';
import '../../css/directory/ImageOverlay.css';

const DirectoryImages = ({ files, path }) => {
  const [layout, setLayout] = useState('grid'); // Default to grid layout
  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage collapsibility
  const [isOverlayVisible, setIsOverlayVisible] = useState(false); // State for overlay visibility
  const [currentIndex, setCurrentIndex] = useState(0); // State for the current image index

  const getLayoutStyle = () => {
    switch (layout) {
      case 'column':
        return 'column';
      default:
        return 'grid';
    }
  };

  const showOverlay = (index) => {
    setCurrentIndex(index);
    setIsOverlayVisible(true);
  };

  const hideOverlay = () => {
    setIsOverlayVisible(false);
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % files.length);
  };

  const showPrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + files.length) % files.length);
  };

  return (
    <div id='image-container-full'>
      <div id="image-top">
        <div id="image-headline">
          <p>Images</p>
          <button onClick={() => setIsCollapsed(!isCollapsed)} style={{ marginLeft: '10px' }}>
            {isCollapsed ? 'Show' : 'Hide'}
          </button>
        </div>

        {!isCollapsed && (
          <div className="layout-select">
            <label htmlFor="layout-select">Select Layout: </label>
            <select id="layout-select" value={layout} onChange={(e) => setLayout(e.target.value)}>
              <option value="grid">Grid</option>
              <option value="column">Column</option>
            </select>
          </div>
        )}
      </div>
      <div id='image-container' className={`container image-container ${isCollapsed ? 'collapsed' : ''}`}>
        <ul className={getLayoutStyle()}>
          {files.map((file, index) => (
            <li key={file} className="image-container" onClick={() => showOverlay(index)}>
              <Link to="#" style={{ display: 'block', width: '100%', height: '100%' }}>
                <img
                  src={`http://localhost:5000/api/media/images/${path}/${file}`}
                  alt={file}
                  className="image"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {isOverlayVisible && (
        <ImageOverlay
          src={`http://localhost:5000/api/media/images/${path}/${files[currentIndex]}`}
          alt={files[currentIndex]}
          onClose={hideOverlay}
          onNext={showNextImage}
          onPrev={showPrevImage}
        />
      )}
    </div>
  );
};

export default DirectoryImages;
