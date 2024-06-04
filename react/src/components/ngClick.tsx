import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
  disabled?: boolean;
}

const NgClick: React.FC<NgClickProps> = ({ onClick, disabled, children }) => {
  const [active, setActive] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);
  const touchTimeoutRef = useRef<number | null>(null);
  const clickTimeoutRef = useRef<number | null>(null);
  const touchPositions = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

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
    const touchDistance = Math.sqrt(
      Math.pow(touchEnd.x - (touchStart?.x || 0), 2) + Math.pow(touchEnd.y - (touchStart?.y || 0), 2)
    );

    if (active && touchDuration < 750 && touchDistance < 12) {
      if (!touchPositions.current.length) {
        document.addEventListener('click', handleDocumentClick, true);
        document.addEventListener('touchstart', handleDocumentTouchStart, true);
      }
      setLastTouchTime(Date.now());
      touchPositions.current.push(touchEnd.x, touchEnd.y);
      onClick(event);
    }
    setActive(false);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (Date.now() - lastTouchTime < 2500) {
      const { clientX, clientY } = event;
      if (touchPositions.current.some((pos, index) => index % 2 === 0 && Math.abs(pos - clientX) < 25 && Math.abs(touchPositions.current[index + 1] - clientY) < 25)) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  const handleDocumentTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    const { clientX, clientY } = touch;
    touchPositions.current.push(clientX, clientY);
    touchTimeoutRef.current = window.setTimeout(() => {
      touchPositions.current = touchPositions.current.filter((pos, index) => index % 2 !== 0 || pos !== clientX || touchPositions.current[index + 1] !== clientY);
    }, 2500);
  };

  return (
    <div
      className={`ng-click ${active ? 'ng-click-active' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={(event) => {
        if (!disabled) {
          onClick(event);
        }
      }}
      onMouseDown={() => setActive(true)}
      onMouseMove={() => setActive(false)}
      onMouseUp={() => setActive(false)}
    >
      {children}
    </div>
  );
};

export default NgClick;