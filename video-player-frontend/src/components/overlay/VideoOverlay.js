import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../../css/directory/VideoOverlay.css';

const VideoOverlay = ({ src, onClose, onNext, onPrev }) => {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const overlayRef = useRef(null);
  const videoContainerRef = useRef(null);

  const handleBackgroundClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      onNext();
    } else if (e.key === 'ArrowLeft') {
      onPrev();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prevScale => Math.max(0.1, prevScale + zoomFactor));
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) { // Only start dragging if left button is pressed
      setIsDragging(true);
      setStartPos({ x: e.clientX - translate.x, y: e.clientY - translate.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setTranslate({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDragStart = (e) => {
    e.preventDefault();
  };

  const checkVideoSize = () => {
    const videoContainer = videoContainerRef.current;
    if (videoContainer) {
      const { clientWidth, clientHeight } = videoContainer;
      const { innerWidth, innerHeight } = window;
      const scaleX = innerWidth / clientWidth;
      const scaleY = (innerHeight * 0.9) / clientHeight; // 90% of viewport height
      const minScale = Math.min(scaleX, scaleY, 1);

      setScale(minScale);
      setTranslate({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Re-enable background scrolling
    };
  }, []);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = src;
    video.onloadedmetadata = checkVideoSize;
  }, [src]);

  return (
    <div
      className="overlay"
      onClick={handleBackgroundClick}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      ref={overlayRef}
    >
      <div
        className="overlay-content"
        ref={videoContainerRef}
        style={{ transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)` }}
      >
        <video
          src={src}
          className="overlay-video"
          controls
          onDragStart={handleDragStart}
        />
      </div>
    </div>
  );
};

VideoOverlay.propTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

export default VideoOverlay;
