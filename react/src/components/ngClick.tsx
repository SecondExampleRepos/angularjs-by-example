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
  const rootElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (Date.now() - lastTouchTime < 2500) {
        const { clientX, clientY } = event;
        if (touchCoordinates.current.some((coord, index) => index % 2 === 0 && Math.abs(coord - clientX) < 25 && Math.abs(touchCoordinates.current[index + 1] - clientY) < 25)) {
          event.stopPropagation();
          event.preventDefault();
          (event.target as HTMLElement).blur();
        }
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const { clientX, clientY } = event.touches[0];
      touchCoordinates.current.push(clientX, clientY);
      touchTimeout.current = window.setTimeout(() => {
        touchCoordinates.current = touchCoordinates.current.filter((_, index) => index % 2 !== 0 || Math.abs(touchCoordinates.current[index] - clientX) >= 25 || Math.abs(touchCoordinates.current[index + 1] - clientY) >= 25);
      }, 2500);
    };

    rootElement.current?.addEventListener('click', handleClick, true);
    rootElement.current?.addEventListener('touchstart', handleTouchStart, true);

    return () => {
      rootElement.current?.removeEventListener('click', handleClick, true);
      rootElement.current?.removeEventListener('touchstart', handleTouchStart, true);
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current);
      }
    };
  }, [lastTouchTime]);

  const handleTouchStart = (event: React.TouchEvent) => {
    setActive(true);
    const { clientX, clientY } = event.touches[0];
    setTouchStart({ x: clientX, y: clientY });
  };

  const handleTouchMove = () => {
    setActive(false);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStart) {
      const { clientX, clientY } = event.changedTouches[0];
      const distance = Math.sqrt(Math.pow(clientX - touchStart.x, 2) + Math.pow(clientY - touchStart.y, 2));
      if (distance < 12 && Date.now() - lastTouchTime < 750) {
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

  return (
    <div
      ref={rootElement}
      className={`ng-click ${active ? 'ng-click-active' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchMove}
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
