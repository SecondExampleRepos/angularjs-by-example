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
        event.stopPropagation();
        event.preventDefault();
        (event.target as HTMLElement).blur();
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
      if (!touchStart) return;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < 12 && Date.now() - lastTouch < 750) {
        setTouchPoints((prev) => [...prev, touch.clientX, touch.clientY]);
        onClick(event as unknown as React.MouseEvent);
      }

      setActive(false);
      setLastTouch(Date.now());
    };

    const rootElement = rootElementRef.current;
    if (rootElement) {
      rootElement.addEventListener('click', handleClick, true);
      rootElement.addEventListener('touchstart', handleTouchStart, true);
      rootElement.addEventListener('touchmove', handleTouchMove, true);
      rootElement.addEventListener('touchend', handleTouchEnd, true);
    }

    return () => {
      if (rootElement) {
        rootElement.removeEventListener('click', handleClick, true);
        rootElement.removeEventListener('touchstart', handleTouchStart, true);
        rootElement.removeEventListener('touchmove', handleTouchMove, true);
        rootElement.removeEventListener('touchend', handleTouchEnd, true);
      }
    };
  }, [lastTouch, touchStart, onClick]);

  return (
    <div
      ref={rootElementRef}
      className={active ? 'ng-click-active' : ''}
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
