import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  disabled?: boolean;
}

const NgClick: React.FC<NgClickProps> = ({ onClick, disabled, children }) => {
  const [active, setActive] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);
  const touchTimeoutRef = useRef<number | null>(null);
  const touchCoordinatesRef = useRef<number[]>([]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (Date.now() - lastTouchTime < 2500) {
        const { clientX, clientY } = event;
        if (touchCoordinatesRef.current.some((coord, index) => index % 2 === 0 && Math.abs(coord - clientX) < 25 && Math.abs(touchCoordinatesRef.current[index + 1] - clientY) < 25)) {
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
    const touchEnd = { x: touch.clientX, y: touch.clientY };
    const touchDuration = Date.now() - lastTouchTime;
    const touchDistance = Math.sqrt(Math.pow(touchEnd.x - (touchStart?.x || 0), 2) + Math.pow(touchEnd.y - (touchStart?.y || 0), 2));

    if (active && touchDuration < 750 && touchDistance < 12) {
      setLastTouchTime(Date.now());
      touchCoordinatesRef.current.push(touchEnd.x, touchEnd.y);
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
      touchTimeoutRef.current = window.setTimeout(() => {
        touchCoordinatesRef.current = touchCoordinatesRef.current.filter((_, index) => index % 2 !== 0 || Date.now() - lastTouchTime < 2500);
      }, 2500);
      if (!disabled) {
        onClick(event);
      }
    }
    setActive(false);
  };

  return (
    <div
      className={`ng-click ${active ? 'ng-click-active' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseMove={() => setActive(false)}
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
