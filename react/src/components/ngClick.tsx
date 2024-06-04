// react/src/components/ngClick.tsx

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
  const clickTimeout = useRef<number | null>(null);
  const rootElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    rootElement.current = document.documentElement;
    return () => {
      if (rootElement.current) {
        rootElement.current.removeEventListener('click', handleDocumentClick, true);
        rootElement.current.removeEventListener('touchstart', handleDocumentTouchStart, true);
      }
    };
  }, []);

  const handleDocumentClick = (event: MouseEvent) => {
    if (Date.now() - lastTouchTime < 2500) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const handleDocumentTouchStart = (event: TouchEvent) => {
    if (Date.now() - lastTouchTime < 2500) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

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
    const touchDuration = Date.now() - (touchStart ? touchStart.time : 0);
    const touchDistance = Math.sqrt(Math.pow(touchEnd.x - (touchStart ? touchStart.x : 0), 2) + Math.pow(touchEnd.y - (touchStart ? touchStart.y : 0), 2));

    if (touchDuration < 750 && touchDistance < 12) {
      setLastTouchTime(Date.now());
      if (rootElement.current) {
        rootElement.current.addEventListener('click', handleDocumentClick, true);
        rootElement.current.addEventListener('touchstart', handleDocumentTouchStart, true);
      }
      onClick(event);
    }
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