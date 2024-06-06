// react/src/components/ngClick.tsx

import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
  disabled?: boolean;
}

const NgClick: React.FC<NgClickProps> = ({ onClick, disabled, children }) => {
  const [active, setActive] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);
  const touchTimeout = useRef<number | null>(null);
  const touchCoordinates = useRef<number[]>([]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (Date.now() - lastTouchTime < 2500) {
        const { clientX, clientY } = event;
        if (touchCoordinates.current.some((coord, index) => index % 2 === 0 && Math.abs(coord - clientX) < 25 && Math.abs(touchCoordinates.current[index + 1] - clientY) < 25)) {
          event.stopPropagation();
          event.preventDefault();
        }
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [lastTouchTime]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setActive(true);
    const touch = event.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = () => {
    setActive(false);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    const touchEnd = { x: touch.clientX, y: touch.clientY };
    const distance = Math.sqrt(Math.pow(touchEnd.x - (touchStart?.x || 0), 2) + Math.pow(touchEnd.y - (touchStart?.y || 0), 2));

    if (active && distance < 12) {
      setLastTouchTime(Date.now());
      touchCoordinates.current.push(touchEnd.x, touchEnd.y);
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current);
      }
      touchTimeout.current = window.setTimeout(() => {
        touchCoordinates.current = touchCoordinates.current.filter((_, index) => index % 2 !== 0 || Date.now() - lastTouchTime < 2500);
      }, 2500);

      if (!disabled) {
        onClick(event);
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