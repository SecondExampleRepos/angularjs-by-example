import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  disabled?: boolean;
}

const NgClick: React.FC<NgClickProps> = ({ onClick, disabled, children }) => {
  const [active, setActive] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);
  const touchTimeout = useRef<NodeJS.Timeout | null>(null);
  const touchCoordinates = useRef<number[]>([]);

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
    const touchDuration = Date.now() - lastTouchTime;

    if (active && touchStart && touchDuration < 750) {
      const distance = Math.sqrt(Math.pow(touchEnd.x - touchStart.x, 2) + Math.pow(touchEnd.y - touchStart.y, 2));
      if (distance < 12) {
        if (!touchCoordinates.current.length) {
          document.addEventListener('click', handleDocumentClick, true);
          document.addEventListener('touchstart', handleDocumentTouchStart, true);
        }
        setLastTouchTime(Date.now());
        touchCoordinates.current.push(touchEnd.x, touchEnd.y);
        if (event.target instanceof HTMLElement) {
          event.target.blur();
        }
        if (!disabled) {
          onClick(event as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>);
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
    const { clientX, clientY } = touch;
    touchCoordinates.current.push(clientX, clientY);
    if (touchTimeout.current) {
      clearTimeout(touchTimeout.current);
    }
    touchTimeout.current = setTimeout(() => {
      touchCoordinates.current = touchCoordinates.current.filter((_, index) => index % 2 !== 0);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current);
      }
      document.removeEventListener('click', handleDocumentClick, true);
      document.removeEventListener('touchstart', handleDocumentTouchStart, true);
    };
  }, []);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onClick={(event) => {
        if (!disabled) {
          onClick(event);
        }
      }}
      className={active ? 'ng-click-active' : ''}
    >
      {children}
    </div>
  );
};

export default NgClick;
