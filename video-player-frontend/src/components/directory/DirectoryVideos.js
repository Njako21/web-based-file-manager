//src components/DirectoryVideos.js
import React, { useState } from 'react';
import VideoController from '../content/VideoController';

const DirectoryVideos = ({ files, path }) => {
  const [layout, setLayout] = useState('grid'); // Default to grid layout
  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage collapsibility

  const getLayoutStyle = () => {
    switch (layout) {
      case 'column':
        return 'column';
      default:
        return 'grid';
    }
  };


  return (
    <div id='video-container-full'>
      <div id="video-top">
        <div id="video-headline">
          <p>Videos</p>
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
      <div id='video-container' className={`container video-container ${isCollapsed ? 'collapsed' : ''}` }>
        <ul className={getLayoutStyle()}>
          {files.map((file, index) => (
            <VideoController  file={file} path={path}/>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DirectoryVideos;
