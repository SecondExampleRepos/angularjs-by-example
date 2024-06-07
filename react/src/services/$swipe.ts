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
  const e = event.touches && event.touches.length ? event.touches[0] : event;
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

const getEventName = (types: string[], eventName: string): string => {
  const events = {
    mouse: {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
    },
    touch: {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      cancel: 'touchcancel',
    },
  };

  return types.map(type => events[type][eventName]).join(' ');
};

const bindSwipe = (
  element: HTMLElement,
  handlers: SwipeHandlers,
  types: string[] = ['mouse', 'touch']
) => {
  let startPoint: Point | null = null;
  let isSwiping = false;
  let totalX = 0;
  let totalY = 0;
  let lastPoint: Point | null = null;

  const handleStart = (event: TouchEvent | MouseEvent) => {
    startPoint = getPoint(event);
    isSwiping = true;
    totalX = 0;
    totalY = 0;
    lastPoint = startPoint;
    handlers.start && handlers.start(startPoint, event);
  };

  const handleMove = (event: TouchEvent | MouseEvent) => {
    if (!isSwiping || !startPoint) return;

    const currentPoint = getPoint(event);
    totalX += Math.abs(currentPoint.x - lastPoint!.x);
    totalY += Math.abs(currentPoint.y - lastPoint!.y);
    lastPoint = currentPoint;

    if (totalX > 10 || totalY > 10) {
      if (totalY > totalX) {
        isSwiping = false;
        handlers.cancel && handlers.cancel(event);
      } else {
        event.preventDefault();
        handlers.move && handlers.move(currentPoint, event);
      }
    }
  };

  const handleEnd = (event: TouchEvent | MouseEvent) => {
    if (!isSwiping || !startPoint) return;

    isSwiping = false;
    const endPoint = getPoint(event);
    handlers.end && handlers.end(endPoint, event);
  };

  const handleCancel = (event: TouchEvent | MouseEvent) => {
    isSwiping = false;
    handlers.cancel && handlers.cancel(event);
  };

  element.addEventListener(getEventName(types, 'start'), handleStart);
  element.addEventListener(getEventName(types, 'move'), handleMove);
  element.addEventListener(getEventName(types, 'end'), handleEnd);
  if (types.includes('touch')) {
    element.addEventListener(getEventName(types, 'cancel'), handleCancel);
  }

  return () => {
    element.removeEventListener(getEventName(types, 'start'), handleStart);
    element.removeEventListener(getEventName(types, 'move'), handleMove);
    element.removeEventListener(getEventName(types, 'end'), handleEnd);
    if (types.includes('touch')) {
      element.removeEventListener(getEventName(types, 'cancel'), handleCancel);
    }
  };
};

export { bindSwipe, SwipeHandlers, Point };