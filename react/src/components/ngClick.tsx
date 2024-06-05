import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  disabled?: boolean;
}

const NgClick: React.FC<NgClickProps> = ({ onClick, disabled, children }) => {
  const [active, setActive] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);
  const touchTimeout = useRef<NodeJS.Timeout | null>(null);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const touchCoordinates = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      if (touchTimeout.current) clearTimeout(touchTimeout.current);
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
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

    const now = Date.now();
    if (now - lastTouchTime < 2500) {
      const { x, y } = touch;
      if (touchCoordinates.current.some((coord, index) => index % 2 === 0 && Math.abs(coord - x) < 25 && Math.abs(touchCoordinates.current[index + 1] - y) < 25)) {
        touchCoordinates.current = touchCoordinates.current.filter((coord, index) => index % 2 !== 0 || Math.abs(coord - x) >= 25 || Math.abs(touchCoordinates.current[index + 1] - y) >= 25);
        return;
      }
    }

    if (touchStart && touchEnd) {
      const distance = Math.sqrt(Math.pow(touchEnd.x - touchStart.x, 2) + Math.pow(touchEnd.y - touchStart.y, 2));
      if (distance < 12 && Date.now() - lastTouchTime < 750) {
        touchCoordinates.current.push(touchEnd.x, touchEnd.y);
        setLastTouchTime(Date.now());
        if (!disabled) {
          onClick(event);
        }
      }
    }

    setActive(false);
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
      onClick={(event) => {
        if (!disabled) {
          onClick(event);
        }
      }}
    >
      {children}
    </div>
  );
};

export default NgClick;