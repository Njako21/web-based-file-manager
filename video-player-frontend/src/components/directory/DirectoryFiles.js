// src/components/DirectoryFiles.js
import React from 'react';
import { Link } from 'react-router-dom';

const DirectoryFiles = ({ files, path }) => {
  return (
    <div>

        <h2>Files</h2>
        <ul>
            {files.map((file) => (
                <li key={file}>
                    <Link to={`/play/${path}/${file}`}>{file}</Link>
                </li>
            ))}
      </ul>
    </div>
  );
};

export default DirectoryFiles;
