import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
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
        event.stopPropagation();
        event.preventDefault();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchCoordinates.current.push(touch.clientX, touch.clientY);
      touchTimeout.current = window.setTimeout(() => {
        touchCoordinates.current = touchCoordinates.current.filter((_, index) => index % 2 !== 0);
      }, 2500);
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('touchstart', handleTouchStart, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('touchstart', handleTouchStart, true);
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current);
      }
    };
  }, [lastTouchTime]);

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
    const distance = Math.sqrt(
      Math.pow(touch.clientX - touchStart.x, 2) + Math.pow(touch.clientY - touchStart.y, 2)
    );

    if (active && Date.now() - lastTouchTime < 750 && distance < 12) {
      setLastTouchTime(Date.now());
      onClick(event);
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

  return (
    <div
      className={`ng-click ${active ? 'ng-click-active' : ''}`}
      onClick={(event) => {
        if (!disabled) {
          onClick(event);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default NgClick;