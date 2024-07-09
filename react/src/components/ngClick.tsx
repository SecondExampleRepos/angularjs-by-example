import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const NgClick: React.FC<NgClickProps> = ({ onClick, disabled, children }) => {
  const [active, setActive] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);
  const touchTimeoutRef = useRef<number | null>(null);
  const touchPositionsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
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
    const touchEnd = { x: touch.clientX, y: touch.clientY };
    const touchDuration = Date.now() - lastTouchTime;
    const touchDistance = Math.sqrt(
      Math.pow(touchEnd.x - (touchStart?.x || 0), 2) + Math.pow(touchEnd.y - (touchStart?.y || 0), 2)
    );

    if (active && touchDuration < 750 && touchDistance < 12) {
      if (!touchPositionsRef.current.some((pos, index) => index % 2 === 0 && pos === touchEnd.x && touchPositionsRef.current[index + 1] === touchEnd.y)) {
        touchPositionsRef.current.push(touchEnd.x, touchEnd.y);
        setLastTouchTime(Date.now());
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

  const handleMouseMove = () => {
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
      onMouseMove={handleMouseMove}
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
