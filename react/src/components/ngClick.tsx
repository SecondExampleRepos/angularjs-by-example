import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  disabled?: boolean;
}

const NgClick: React.FC<NgClickProps> = ({ onClick, disabled, children }) => {
  const [active, setActive] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [lastTouch, setLastTouch] = useState<number>(0);
  const [touchPoints, setTouchPoints] = useState<number[]>([]);
  const rootElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (Date.now() - lastTouch < 2500) {
        const { clientX, clientY } = event;
        if (touchPoints.includes(clientX) && touchPoints.includes(clientY)) {
          event.stopPropagation();
          event.preventDefault();
          (event.target as HTMLElement).blur();
        }
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const { clientX, clientY } = event.touches[0];
      setTouchPoints((prev) => [...prev, clientX, clientY]);
      setTimeout(() => {
        setTouchPoints((prev) => prev.filter((_, index) => index !== 0 && index !== 1));
      }, 2500);
    };

    const rootElement = rootElementRef.current;
    if (rootElement) {
      rootElement.addEventListener('click', handleClick, true);
      rootElement.addEventListener('touchstart', handleTouchStart, true);
    }

    return () => {
      if (rootElement) {
        rootElement.removeEventListener('click', handleClick, true);
        rootElement.removeEventListener('touchstart', handleTouchStart, true);
      }
    };
  }, [lastTouch, touchPoints]);

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
    const timeElapsed = Date.now() - lastTouch;

    if (active && timeElapsed < 750 && distance < 12) {
      setLastTouch(Date.now());
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
      ref={rootElementRef}
      className={active ? 'ng-click-active' : ''}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
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
