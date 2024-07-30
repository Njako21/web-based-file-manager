// src/components/DirectoryController.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const DirectoryController = ({ currentPath, path}) => {


  return (
    <div id='top-container-full'>
        {path && (
          <Link to={`/media/${path.split('/').slice(0, -1).join('/')}`}>back</Link>
        )}
        {!path && (
          <Link></Link>
        )}
        <div className='directory-controller'>
          <h2>Current Directory: {currentPath}</h2>

        </div>
    </div>
  );
};

export default DirectoryController;
