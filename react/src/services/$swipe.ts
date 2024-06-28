// react/src/services/$swipe.ts

type Point = {
  x: number;
  y: number;
};

type SwipeHandlers = {
  start?: (point: Point, event: Event) => void;
  move?: (point: Point, event: Event) => void;
  end?: (point: Point, event: Event) => void;
  cancel?: (event: Event) => void;
};

const getPoint = (event: TouchEvent | MouseEvent): Point => {
  const touch = (event as TouchEvent).touches?.[0] || (event as MouseEvent);
  return {
    x: touch.clientX,
    y: touch.clientY,
  };
};

const getEventName = (types: string[], phase: string): string => {
  const events: { [key: string]: { [key: string]: string } } = {
    mouse: { start: 'mousedown', move: 'mousemove', end: 'mouseup' },
    touch: { start: 'touchstart', move: 'touchmove', end: 'touchend', cancel: 'touchcancel' },
  };

  return types.map(type => events[type][phase]).join(' ');
};

const bindSwipe = (element: HTMLElement, handlers: SwipeHandlers, types: string[] = ['mouse', 'touch']) => {
  let startPoint: Point | null = null;
  let isSwiping = false;
  let totalX = 0;
  let totalY = 0;

  const startHandler = (event: Event) => {
    startPoint = getPoint(event as TouchEvent | MouseEvent);
    isSwiping = true;
    totalX = 0;
    totalY = 0;
    handlers.start?.(startPoint, event);
  };

  const moveHandler = (event: Event) => {
    if (!isSwiping || !startPoint) return;

    const currentPoint = getPoint(event as TouchEvent | MouseEvent);
    totalX += Math.abs(currentPoint.x - startPoint.x);
    totalY += Math.abs(currentPoint.y - startPoint.y);

    if (totalX > 10 || totalY > 10) {
      if (totalY > totalX) {
        isSwiping = false;
        handlers.cancel?.(event);
      } else {
        event.preventDefault();
        handlers.move?.(currentPoint, event);
      }
    }
  };

  const endHandler = (event: Event) => {
    if (isSwiping && startPoint) {
      isSwiping = false;
      handlers.end?.(getPoint(event as TouchEvent | MouseEvent), event);
    }
  };

  const cancelHandler = (event: Event) => {
    isSwiping = false;
    handlers.cancel?.(event);
  };

  element.addEventListener(getEventName(types, 'start'), startHandler);
  element.addEventListener(getEventName(types, 'move'), moveHandler);
  element.addEventListener(getEventName(types, 'end'), endHandler);
  element.addEventListener(getEventName(types, 'cancel'), cancelHandler);

  return () => {
    element.removeEventListener(getEventName(types, 'start'), startHandler);
    element.removeEventListener(getEventName(types, 'move'), moveHandler);
    element.removeEventListener(getEventName(types, 'end'), endHandler);
    element.removeEventListener(getEventName(types, 'cancel'), cancelHandler);
  };
};

export { bindSwipe, Point, SwipeHandlers };
