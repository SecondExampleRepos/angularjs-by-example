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
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const rootElement = useRef<HTMLDivElement>(null);

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
      if (!touchStart) return;

      const touch = event.changedTouches[0];
      const distance = Math.sqrt(
        Math.pow(touch.clientX - touchStart.x, 2) + Math.pow(touch.clientY - touchStart.y, 2)
      );

      if (distance < 12 && Date.now() - lastTouchTime < 750) {
        if (disabled) return;
        onClick(event as any);
      }

      setActive(false);
      setLastTouchTime(Date.now());
    };

    const element = rootElement.current;
    if (element) {
      element.addEventListener('click', handleClick, true);
      element.addEventListener('touchstart', handleTouchStart, true);
      element.addEventListener('touchmove', handleTouchMove, true);
      element.addEventListener('touchend', handleTouchEnd, true);
    }

    return () => {
      if (element) {
        element.removeEventListener('click', handleClick, true);
        element.removeEventListener('touchstart', handleTouchStart, true);
        element.removeEventListener('touchmove', handleTouchMove, true);
        element.removeEventListener('touchend', handleTouchEnd, true);
      }
    };
  }, [touchStart, lastTouchTime, onClick, disabled]);

  return (
    <div
      ref={rootElement}
      className={`ng-click ${active ? 'ng-click-active' : ''}`}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseMove={() => setActive(false)}
    >
      {children}
    </div>
  );
};

export default NgClick;