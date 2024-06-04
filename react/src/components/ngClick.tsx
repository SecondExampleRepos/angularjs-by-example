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
  const touchPositions = useRef<number[]>([]);
  const rootElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (Date.now() - lastTouchTime < 2500) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchPositions.current.push(touch.clientX, touch.clientY);
      touchTimeout.current = window.setTimeout(() => {
        touchPositions.current = touchPositions.current.filter((_, i) => i % 2 !== 0);
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
    const touch = event.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = () => {
    setActive(false);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0];
    const distance = Math.sqrt(
      Math.pow(touch.clientX - (touchStart?.x || 0), 2) +
      Math.pow(touch.clientY - (touchStart?.y || 0), 2)
    );

    if (active && distance < 12) {
      setLastTouchTime(Date.now());
      onClick(event);
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
      className={active ? 'ng-click-active' : ''}
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