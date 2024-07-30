// src/components/DirectoryFolder.js
import React from 'react';
import { Link } from 'react-router-dom';

const DirectoryFolder = ({ directories, path }) => {
  return (
    <div id='folder-container-full'>

        <h2>Folders</h2>
        <ul>
            {directories.map((directory) => (
            <li key={directory}>
                <Link to={`/media/${path}/${directory}`}>{directory}</Link>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default DirectoryFolder;
