// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import DirectoryView from './components/DirectoryView';
import MediaPlayer from './components/MediaPlayer';
import './css/defaults.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/media*" element={<DirectoryViewWrapper />} />
          <Route path="/play/*" element={<MediaPlayerWrapper />} />
          <Route path="/" element={<DirectoryViewWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

const DirectoryViewWrapper = () => {
  const { '*': path = '' } = useParams();
  return <DirectoryView path={path} />;
};

const MediaPlayerWrapper = () => {
  const { '*': filepath } = useParams();
  const videoExtensions = ['.mp4', '.webm', '.ogg'];
  const isVideo = videoExtensions.some(ext => filepath.toLowerCase().endsWith(ext));
  const mediaSrc = isVideo 
    ? `http://localhost:5000/api/media/videos/${filepath}`
    : `http://localhost:5000/api/media/images/${filepath}`;
  return <MediaPlayer mediaSrc={mediaSrc} isVideo={isVideo} />;
};

export default App;
