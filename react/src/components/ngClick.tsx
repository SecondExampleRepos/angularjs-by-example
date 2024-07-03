import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  disabled?: boolean;
}

const NgClick: React.FC<NgClickProps> = ({ onClick, disabled, children }) => {
  const [active, setActive] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [lastClickTime, setLastClickTime] = useState<number>(0);
  const touchTimeout = useRef<number | null>(null);
  const clickTimeout = useRef<number | null>(null);
  const touchCoordinates = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current);
      }
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
    };
  }, []);

  const handleTouchStart = (event: React.TouchEvent) => {
    setActive(true);
    const touch = event.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = () => {
    setActive(false);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });

    if (touchStart && touchEnd) {
      const timeDiff = Date.now() - lastClickTime;
      const distance = Math.sqrt(Math.pow(touchEnd.x - touchStart.x, 2) + Math.pow(touchEnd.y - touchStart.y, 2));

      if (timeDiff < 750 && distance < 12) {
        if (!touchCoordinates.current.length) {
          document.addEventListener('click', handleDocumentClick, true);
          document.addEventListener('touchstart', handleDocumentTouchStart, true);
        }
        setLastClickTime(Date.now());
        touchCoordinates.current.push(touchEnd.x, touchEnd.y);
        onClick(event);
      }
    }

    setActive(false);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (Date.now() - lastClickTime < 2500) {
      const { clientX, clientY } = event;
      if (touchCoordinates.current.includes(clientX) && touchCoordinates.current.includes(clientY)) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  const handleDocumentTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    const { clientX, clientY } = touch;
    touchCoordinates.current.push(clientX, clientY);
    touchTimeout.current = window.setTimeout(() => {
      const index = touchCoordinates.current.indexOf(clientX);
      if (index > -1) {
        touchCoordinates.current.splice(index, 2);
      }
    }, 2500);
  };

  const handleMouseDown = () => {
    setActive(true);
  };

  const handleMouseUp = () => {
    setActive(false);
  };

  return (
    <div
      className={`ng-click ${active ? 'ng-click-active' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
      style={{ pointerEvents: disabled ? 'none' : 'auto' }}
    >
      {children}
    </div>
  );
};

export default NgClick;
