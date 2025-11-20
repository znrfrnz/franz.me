import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import bsodSound from '../bsod.mp3';

const BSOD = forwardRef(({ isVisible }, ref) => {
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    enterFullscreen: () => {
      const element = containerRef.current;
      if (element) {
        if (element.requestFullscreen) {
           element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
           element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { 
           element.webkitRequestFullscreen();
         } else if (element.msRequestFullscreen) {
           element.msRequestFullscreen();
         }
      }
    },
    playAudio: () => {
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.error("Audio play failed", e));
        }
    }
  }));

  useEffect(() => {
    if (isVisible) {
      // We handle fullscreen and audio via ref from parent to ensure user gesture context,
      // but if it becomes visible via other means (e.g. initial load), we might want to try here too.
      // However, for the click case, the parent calls the methods.
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} className="bsod" style={{ display: isVisible ? 'flex' : 'none' }}>
      <audio ref={audioRef} src={bsodSound} loop></audio>
      <div className="parag">
        <p> {'>:('} </p>
        <p> I said do not click </p>
        <p> (refresh the page) </p>
      </div>
    </div>
  );
});

BSOD.displayName = 'BSOD';

export default BSOD;
