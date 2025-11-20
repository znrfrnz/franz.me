import React, { useState, useRef } from 'react';

const DraggableWindow = ({ 
  title, 
  children, 
  className, 
  headerClassName, 
  contentClassName, 
  minButtonClass 
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState(null);
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const rect = windowRef.current.getBoundingClientRect();
    
    // Calculate offset from the mouse to the top-left corner of the element
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const onMouseMove = (e) => {
      setPosition({
        x: e.pageX - offsetX,
        y: e.pageY - offsetY
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const style = {
    ...(position ? { left: `${position.x}px`, top: `${position.y}px`, right: 'auto', bottom: 'auto' } : {}),
  };

  return (
    <div 
      ref={windowRef}
      className={`${className} ${isMinimized ? 'minimized' : ''}`}
      style={style}
    >
      <div className={headerClassName} onMouseDown={handleMouseDown}>
        {title}
        <button className={minButtonClass} onClick={toggleMinimize}></button>
      </div>
      <div className={contentClassName} style={{ display: isMinimized ? 'none' : 'block' }}>
        {children}
      </div>
    </div>
  );
};

export default DraggableWindow;
