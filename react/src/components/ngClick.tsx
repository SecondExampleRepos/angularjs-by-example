import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  disabled?: boolean;
}

const NgClick: React.FC<NgClickProps> = ({ onClick, disabled, children }) => {
  const [active, setActive] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);
  const touchTimeout = useRef<NodeJS.Timeout | null>(null);
  const touchCoordinates = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current);
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
    if (!touchStart) return;

    const touch = event.changedTouches[0];
    const touchEnd = { x: touch.clientX, y: touch.clientY };
    const timeDiff = Date.now() - lastTouchTime;
    const distance = Math.sqrt(Math.pow(touchEnd.x - touchStart.x, 2) + Math.pow(touchEnd.y - touchStart.y, 2));

    if (timeDiff < 750 && distance < 12) {
      if (!touchCoordinates.current.some((coord, index) => index % 2 === 0 && coord === touchEnd.x && touchCoordinates.current[index + 1] === touchEnd.y)) {
        touchCoordinates.current.push(touchEnd.x, touchEnd.y);
        setLastTouchTime(Date.now());
        onClick(event);
      }
    }

    setActive(false);
    setTouchStart(null);
  };

  const handleMouseDown = () => {
    setActive(true);
  };

  const handleMouseUp = () => {
    setActive(false);
  };

  const handleClick = (event: React.MouseEvent) => {
    if (!disabled) {
      onClick(event);
    }
  };

  return (
    <div
      className={`ng-click ${active ? 'ng-click-active' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default NgClick;