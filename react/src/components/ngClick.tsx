import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const NgClick: React.FC<NgClickProps> = ({ onClick, disabled, children }) => {
  const [active, setActive] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);
  const touchTimeout = useRef<number | null>(null);
  const clickTimeout = useRef<number | null>(null);
  const touchCoordinates = useRef<number[]>([]);

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
    const touchDuration = now - lastTouchTime;

    if (touchStart && touchEnd && touchDuration < 750) {
      const distance = Math.sqrt(
        Math.pow(touchEnd.x - touchStart.x, 2) + Math.pow(touchEnd.y - touchStart.y, 2)
      );

      if (distance < 12) {
        if (!touchCoordinates.current.length) {
          document.addEventListener('click', handleDocumentClick, true);
          document.addEventListener('touchstart', handleDocumentTouchStart, true);
        }

        setLastTouchTime(now);
        touchCoordinates.current.push(touchEnd.x, touchEnd.y);

        if (clickTimeout.current) {
          clearTimeout(clickTimeout.current);
        }

        clickTimeout.current = window.setTimeout(() => {
          touchCoordinates.current = [];
        }, 2500);

        if (disabled !== true) {
          onClick(event);
        }
      }
    }

    setActive(false);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (Date.now() - lastTouchTime < 2500) {
      const { clientX, clientY } = event;
      if (touchCoordinates.current.includes(clientX) && touchCoordinates.current.includes(clientY)) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  const handleDocumentTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    touchCoordinates.current.push(touch.clientX, touch.clientY);

    if (touchTimeout.current) {
      clearTimeout(touchTimeout.current);
    }

    touchTimeout.current = window.setTimeout(() => {
      touchCoordinates.current = [];
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current);
      }
      document.removeEventListener('click', handleDocumentClick, true);
      document.removeEventListener('touchstart', handleDocumentTouchStart, true);
    };
  }, []);

  return (
    <div
      className={`ng-click ${active ? 'ng-click-active' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={(event) => {
        if (disabled !== true) {
          onClick(event);
        }
      }}
    >
      {children}
    </div>
  );
};

export default NgClick;
