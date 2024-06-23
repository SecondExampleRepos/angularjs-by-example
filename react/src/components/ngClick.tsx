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
  const clickTimeout = useRef<number | null>(null);
  const touchPositions = useRef<number[]>([]);
  const rootElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    rootElement.current = document.documentElement;
    return () => {
      if (rootElement.current) {
        rootElement.current.removeEventListener('click', handleDocumentClick, true);
        rootElement.current.removeEventListener('touchstart', handleDocumentTouchStart, true);
      }
    };
  }, []);

  const handleDocumentClick = (event: MouseEvent) => {
    if (Date.now() - lastTouchTime < 2500) {
      const { clientX, clientY } = event;
      if (clientX < 1 && clientY < 1) return;
      if (touchPositions.current.length && touchPositions.current[0] === clientX && touchPositions.current[1] === clientY) {
        touchPositions.current = [];
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      (event.target as HTMLElement).blur();
    }
  };

  const handleDocumentTouchStart = (event: TouchEvent) => {
    const { clientX, clientY } = event.touches[0];
    touchPositions.current.push(clientX, clientY);
    setTimeout(() => {
      for (let i = 0; i < touchPositions.current.length; i += 2) {
        if (touchPositions.current[i] === clientX && touchPositions.current[i + 1] === clientY) {
          touchPositions.current.splice(i, 2);
          break;
        }
      }
    }, 2500);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    setActive(true);
    const { clientX, clientY } = event.touches[0];
    setTouchStart({ x: clientX, y: clientY });
  };

  const handleTouchMove = () => {
    setActive(false);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const { clientX, clientY } = event.changedTouches[0];
    const touchDuration = Date.now() - lastTouchTime;
    const touchDistance = Math.sqrt(Math.pow(clientX - (touchStart?.x || 0), 2) + Math.pow(clientY - (touchStart?.y || 0), 2));

    if (active && touchDuration < 750 && touchDistance < 12) {
      if (!rootElement.current) {
        rootElement.current = document.documentElement;
        rootElement.current.addEventListener('click', handleDocumentClick, true);
        rootElement.current.addEventListener('touchstart', handleDocumentTouchStart, true);
      }
      setLastTouchTime(Date.now());
      touchPositions.current.push(clientX, clientY);
      if (!disabled) {
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
      className={`ng-click ${active ? 'ng-click-active' : ''}`}
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