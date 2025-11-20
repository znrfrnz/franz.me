import React, { useState, useRef } from 'react';

const DangerButton = ({ onClick, className, children }) => {
  const [position, setPosition] = useState(null);
  const buttonRef = useRef(null);
  const isDragging = useRef(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = false;
    const rect = buttonRef.current.getBoundingClientRect();
    
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const startX = e.clientX;
    const startY = e.clientY;

    const onMouseMove = (e) => {
      if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) {
        isDragging.current = true;
      }
      setPosition({
        x: e.clientX - offsetX,
        y: e.clientY - offsetY
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleClick = (e) => {
    if (!isDragging.current) {
      onClick(e);
    }
  };

  const style = {
    ...(position ? { left: `${position.x}px`, top: `${position.y}px`, right: 'auto', bottom: 'auto' } : {}),
  };

  return (
    <button 
      ref={buttonRef}
      className={className}
      style={style}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default DangerButton;
