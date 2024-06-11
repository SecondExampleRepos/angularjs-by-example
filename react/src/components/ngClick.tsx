import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  disabled?: boolean;
}

const NgClick: React.FC<NgClickProps> = ({ onClick, disabled, children }) => {
  const [active, setActive] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);
  const touchCoordinates = useRef<number[]>([]);
  const rootElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (Date.now() - lastTouchTime < 2500) {
        const { clientX, clientY } = event;
        if (touchCoordinates.current.some((coord, index) => index % 2 === 0 && Math.abs(coord - clientX) < 25 && Math.abs(touchCoordinates.current[index + 1] - clientY) < 25)) {
          event.stopPropagation();
          event.preventDefault();
        }
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const { clientX, clientY } = event.touches[0];
      touchCoordinates.current.push(clientX, clientY);
      setTimeout(() => {
        touchCoordinates.current = touchCoordinates.current.filter((_, index) => index % 2 !== 0 || Date.now() - lastTouchTime < 2500);
      }, 2500);
    };

    rootElement.current?.addEventListener('click', handleClick, true);
    rootElement.current?.addEventListener('touchstart', handleTouchStart, true);

    return () => {
      rootElement.current?.removeEventListener('click', handleClick, true);
      rootElement.current?.removeEventListener('touchstart', handleTouchStart, true);
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
    if (!touchStart) return;

    const { clientX, clientY } = event.changedTouches[0];
    const distance = Math.sqrt(Math.pow(clientX - touchStart.x, 2) + Math.pow(clientY - touchStart.y, 2));
    const timeElapsed = Date.now() - lastTouchTime;

    if (active && timeElapsed < 750 && distance < 12) {
      setLastTouchTime(Date.now());
      if (!disabled) {
        onClick(event);
      }
    }

    setActive(false);
  };

  return (
    <div
      ref={rootElement}
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