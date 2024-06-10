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
        event.stopPropagation();
        event.preventDefault();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      setTouchStart({ x: touch.clientX, y: touch.clientY });
      setActive(true);
    };

    const handleTouchMove = () => {
      setActive(false);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      const touchEnd = { x: touch.clientX, y: touch.clientY };
      const touchDuration = Date.now() - lastTouchTime;
      const touchDistance = Math.sqrt(
        Math.pow(touchEnd.x - (touchStart?.x || 0), 2) + Math.pow(touchEnd.y - (touchStart?.y || 0), 2)
      );

      if (active && touchDuration < 750 && touchDistance < 12) {
        setLastTouchTime(Date.now());
        touchCoordinates.current.push(touchEnd.x, touchEnd.y);
        onClick(event as unknown as React.MouseEvent);
      }

      setActive(false);
    };

    const handleTouchCancel = () => {
      setActive(false);
    };

    rootElement.current?.addEventListener('click', handleClick, true);
    rootElement.current?.addEventListener('touchstart', handleTouchStart, true);
    rootElement.current?.addEventListener('touchmove', handleTouchMove, true);
    rootElement.current?.addEventListener('touchend', handleTouchEnd, true);
    rootElement.current?.addEventListener('touchcancel', handleTouchCancel, true);

    return () => {
      rootElement.current?.removeEventListener('click', handleClick, true);
      rootElement.current?.removeEventListener('touchstart', handleTouchStart, true);
      rootElement.current?.removeEventListener('touchmove', handleTouchMove, true);
      rootElement.current?.removeEventListener('touchend', handleTouchEnd, true);
      rootElement.current?.removeEventListener('touchcancel', handleTouchCancel, true);
    };
  }, [active, lastTouchTime, onClick, touchStart]);

  return (
    <div
      ref={rootElement}
      className={`ng-click ${active ? 'ng-click-active' : ''}`}
      onClick={(event) => {
        if (!disabled) {
          onClick(event);
        }
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseMove={() => setActive(false)}
    >
      {children}
    </div>
  );
};

export default NgClick;