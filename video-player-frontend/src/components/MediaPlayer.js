// src/components/MediaPlayer.js
import React from 'react';
import { Link } from 'react-router-dom';

const MediaPlayer = ({ mediaSrc, isVideo }) => {
  return (
    <div>
      {mediaSrc && (
        <Link to={`/media/${mediaSrc.split('/')[4]}`}>back</Link>
      )}
      {isVideo ? (
        <video controls width="600">
          <source src={mediaSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Link to={`/media/${mediaSrc.split('/')[4]}`}>
        <img src={mediaSrc} alt="Media content" width="600" />
        </Link>
      )}
    </div>
  );
};

export default MediaPlayer;