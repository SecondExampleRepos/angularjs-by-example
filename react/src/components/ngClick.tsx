import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  disabled?: boolean;
}

const NgClick: React.FC<NgClickProps> = ({ onClick, disabled, children }) => {
  const [active, setActive] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);
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
    setLastTouchTime(Date.now());
  };

  const handleTouchMove = () => {
    setActive(false);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });

    const touchDuration = Date.now() - lastTouchTime;
    const distance = Math.sqrt(
      Math.pow(touch.clientX - (touchStart?.x || 0), 2) +
      Math.pow(touch.clientY - (touchStart?.y || 0), 2)
    );

    if (active && touchDuration < 750 && distance < 12) {
      if (!touchCoordinates.current.length) {
        document.addEventListener('click', handleDocumentClick, true);
        document.addEventListener('touchstart', handleDocumentTouchStart, true);
      }
      setLastTouchTime(Date.now());
      touchCoordinates.current.push(touch.clientX, touch.clientY);
      onClick(event);
    }
    setActive(false);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (Date.now() - lastTouchTime > 2500) {
      document.removeEventListener('click', handleDocumentClick, true);
      document.removeEventListener('touchstart', handleDocumentTouchStart, true);
      touchCoordinates.current = [];
      return;
    }

    const { clientX, clientY } = event;
    if (touchCoordinates.current.some((coord, index) => index % 2 === 0 && Math.abs(coord - clientX) < 25 && Math.abs(touchCoordinates.current[index + 1] - clientY) < 25)) {
      event.stopPropagation();
      event.preventDefault();
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
      touchCoordinates.current = touchCoordinates.current.filter((coord, index) => index % 2 !== 0 || Math.abs(coord - clientX) >= 25 || Math.abs(touchCoordinates.current[index + 1] - clientY) >= 25);
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
