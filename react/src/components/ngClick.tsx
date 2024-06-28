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
    const touch = event.changedTouches[0];
    const touchEnd = { x: touch.clientX, y: touch.clientY };
    const touchDuration = Date.now() - lastTouchTime;

    if (active && touchStart && touchDuration < 750) {
      const distance = Math.sqrt(
        Math.pow(touchEnd.x - touchStart.x, 2) + Math.pow(touchEnd.y - touchStart.y, 2)
      );

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
          onClick(event);
        }
      }
    }

    setActive(false);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (Date.now() - lastTouchTime < 2500) {
      const { clientX, clientY } = event;
      if (isDuplicateTouch(clientX, clientY)) {
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

    touchTimeout.current = window.setTimeout(() => {
      touchCoordinates.current = [];
    }, 2500);
  };

  const isDuplicateTouch = (x: number, y: number) => {
    for (let i = 0; i < touchCoordinates.current.length; i += 2) {
      if (Math.abs(touchCoordinates.current[i] - x) < 25 && Math.abs(touchCoordinates.current[i + 1] - y) < 25) {
        touchCoordinates.current.splice(i, 2);
        return true;
      }
    }
    return false;
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
