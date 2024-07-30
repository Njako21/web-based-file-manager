// src/components/DirectoryContentController.js
import React from 'react';
import { Link } from 'react-router-dom';
import DirectoryFolder from './DirectoryFolder';
import DirectoryVideos from './DirectoryVideos';
import DirectoryFiles from './DirectoryFiles';
import DirectoryImages from './DirectoryImages';
import '../../css/directory/Directory.css';

const DirectoryContentController = ({ directories, videos, images, files, path }) => {
  return (
    <div>
      {directories.length > 0 && (
        <DirectoryFolder directories={directories} path={path} />
      )}
      <div className={`media-container`}>
        {videos.length > 0 && (
          <DirectoryVideos files={videos} path={path} />
        )}
        {images.length > 0 && (
          <DirectoryImages files={images} path={path} />
        )}
      </div>
      {files.length > 0 && (
        <DirectoryFiles files={files} path={path} />
      )}
    </div>
  );
};

export default DirectoryContentController;
