import React, { useRef, useEffect } from 'react';
import SwipeService from './SwipeService';

const SwipeComponent: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      SwipeService.bind(elementRef.current, {
        start: (event) => console.log('Swipe started:', event),
        move: (event) => console.log('Swiping:', event),
        end: (event) => console.log('Swipe ended:', event),
        cancel: (event) => console.log('Swipe cancelled:', event),
      });
    }
  }, []);

  return <div ref={elementRef} style={{ width: '100%', height: '100vh', backgroundColor: 'lightgray' }}>Swipe here</div>;
};

export default SwipeComponent;