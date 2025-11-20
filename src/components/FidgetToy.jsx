import React, { useState, useRef } from 'react';

const FidgetToy = ({ className, children }) => {
  const [position, setPosition] = useState(null);
  const [color, setColor] = useState('#00f2ff'); // Initial color (cyan)
  const [count, setCount] = useState(0);
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
      if (Math.abs(e.pageX - startX) > 5 || Math.abs(e.pageY - startY) > 5) {
        isDragging.current = true;
      }
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

  const handleClick = () => {
    if (!isDragging.current) {
      // Change color randomly
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      setColor(randomColor);
      setCount(count + 1);
    }
  };

  const style = {
    ...(position ? { left: `${position.x}px`, top: `${position.y}px`, right: 'auto', bottom: 'auto' } : {}),
    backgroundColor: color,
  };

  return (
    <button 
      ref={buttonRef}
      className={className}
      style={style}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {children || "Click me!"}
      <div style={{ fontSize: '12px', marginTop: '5px' }}>{count}</div>
    </button>
  );
};

export default FidgetToy;
