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
  const clickTimeoutRef = useRef<number | null>(null);
  const rootElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (Date.now() - lastTouchTime < 2500) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    const rootElement = rootElementRef.current;
    if (rootElement) {
      rootElement.addEventListener('click', handleClick, true);
    }

    return () => {
      if (rootElement) {
        rootElement.removeEventListener('click', handleClick, true);
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
    setActive(false);
    const touch = event.changedTouches[0];
    const touchEnd = { x: touch.clientX, y: touch.clientY };
    const touchDuration = Date.now() - (touchStart?.x || 0);
    const touchDistance = Math.sqrt(
      Math.pow(touchEnd.x - (touchStart?.x || 0), 2) + Math.pow(touchEnd.y - (touchStart?.y || 0), 2)
    );

    if (touchDuration < 750 && touchDistance < 12) {
      setLastTouchTime(Date.now());
      if (!disabled) {
        onClick(event);
      }
    }
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
      ref={rootElementRef}
    >
      {children}
    </div>
  );
};

export default NgClick;