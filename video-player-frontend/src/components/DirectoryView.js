// src/components/DirectoryContentController.js
import React, { useState, useEffect } from 'react';
import DirectoryController from './directory/DirectoryController';
import DirectoryContentController from './directory/DirectoryContentController';
import '../css/directory/Directory.css';

const DirectoryView = ({ path }) => {
  const [directories, setDirectories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);


  useEffect(() => {
    const fetchDirectoryContents = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/media/${path}`);
        console.log(`Raw response for /api/media/${path}:`, response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDirectories(data.directories);
        setVideos(data.videos);
        setImages(data.images);
        setFiles(data.files);
      } catch (error) {
        console.error("Failed to fetch directory contents:", error);
      }
    };

    fetchDirectoryContents();
  }, [path]);

  const currentPath = path ? `media${path}` : 'media';

  return (
    <div>
      <DirectoryController currentPath={currentPath} path={path} />

      <DirectoryContentController 
        directories={directories} 
        videos={videos} 
        images={images} 
        files={files} 
        path={path} 
      />

    </div>
  );
};

export default DirectoryView;
