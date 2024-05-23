import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  disabled?: boolean;
}

const NgClick: React.FC<NgClickProps> = ({ onClick, disabled, children }) => {
  const [active, setActive] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [lastTouch, setLastTouch] = useState<number>(0);
  const touchTimeout = useRef<number | null>(null);
  const clickTimeout = useRef<number | null>(null);
  const touchCoordinates = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current);
      }
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
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
    if (!touchStart) return;

    const touch = event.changedTouches[0];
    const touchDuration = Date.now() - lastTouch;
    const distance = Math.sqrt(
      Math.pow(touch.clientX - touchStart.x, 2) + Math.pow(touch.clientY - touchStart.y, 2)
    );

    if (active && touchDuration < 750 && distance < 12) {
      if (!touchCoordinates.current.length) {
        document.addEventListener('click', handleDocumentClick, true);
        document.addEventListener('touchstart', handleDocumentTouchStart, true);
      }
      setLastTouch(Date.now());
      touchCoordinates.current.push(touch.clientX, touch.clientY);
      if (!disabled) {
        onClick(event);
      }
    }
    setActive(false);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (Date.now() - lastTouch < 2500) {
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
    touchTimeout.current = window.setTimeout(() => {
      const index = touchCoordinates.current.indexOf(clientX);
      if (index > -1) {
        touchCoordinates.current.splice(index, 2);
      }
    }, 2500);
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
      onClick={(event) => onClick(event)}
    >
      {children}
    </div>
  );
};

export default NgClick;