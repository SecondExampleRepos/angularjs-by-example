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
    const touchDuration = Date.now() - lastTouchTime;
    const touchDistance = Math.sqrt(
      Math.pow(touch.clientX - touchStart.x, 2) + Math.pow(touch.clientY - touchStart.y, 2)
    );

    if (active && touchDuration < 750 && touchDistance < 12) {
      if (!touchCoordinates.current.length) {
        document.addEventListener('click', handleDocumentClick, true);
        document.addEventListener('touchstart', handleDocumentTouchStart, true);
      }

      setLastTouchTime(Date.now());
      touchCoordinates.current.push(touch.clientX, touch.clientY);

      if (!disabled) {
        onClick(event);
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

  return (
    <div
      className={`ng-click ${active ? 'ng-click-active' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseMove={() => setActive(false)}
      onClick={(event) => onClick(event)}
    >
      {children}
    </div>
  );
};

export default NgClick;