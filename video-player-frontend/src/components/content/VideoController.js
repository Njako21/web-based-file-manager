// components/content/video.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VideoController = ({ file, path }) => {
  const [layout, setLayout] = useState('...'); // Default to grid layout

  const getLayoutStyle = () => {
    switch (layout) {
      case 'Rename':
        return 'Rename';
      case 'Delete':
        return 'Delete';
      case 'openInFolder':
        return 'openInFolder';
      default:
        return '...';
    }
  };

  return (
    <li key={file} className='video-full'>
      <div className='video-top'>
        <p>{file}</p>
        <select value={layout} onChange={(e) => setLayout(e.target.value)}>
          <option value="..."></option>
          <option value="Rename">Rename</option>
          <option value="Delete">Delete</option>
          <option value="openInFolder">Open in folder</option>
        </select>
      </div>

      <video controls className="video">
        <source src={`http://localhost:5000/api/media/videos/${path}/${file}`} type="video/mp4" />
      </video>
      <div>

      </div>
    </li>
  );
};

export default VideoController;