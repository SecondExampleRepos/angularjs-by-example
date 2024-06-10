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
  const touches = (event as TouchEvent).touches && (event as TouchEvent).touches.length ? (event as TouchEvent).touches : [event];
  const changedTouches = (event as TouchEvent).changedTouches && (event as TouchEvent).changedTouches[0] || (event as any).originalEvent && (event as any).originalEvent.changedTouches && (event as any).originalEvent.changedTouches[0] || touches[0].originalEvent || touches[0];
  return { x: changedTouches.clientX, y: changedTouches.clientY };
};

const getEventName = (types: string[], phase: string): string => {
  const events: string[] = [];
  types.forEach(type => {
    const event = eventMap[type][phase];
    if (event) {
      events.push(event);
    }
  });
  return events.join(' ');
};

const eventMap = {
  mouse: { start: 'mousedown', move: 'mousemove', end: 'mouseup' },
  touch: { start: 'touchstart', move: 'touchmove', end: 'touchend', cancel: 'touchcancel' }
};

const bindSwipe = (element: HTMLElement, handlers: SwipeHandlers, types: string[] = ['mouse', 'touch']) => {
  let startPoint: Point | null = null;
  let isSwiping = false;
  let totalX = 0;
  let totalY = 0;
  let lastPoint: Point | null = null;

  const startHandler = (event: Event) => {
    startPoint = getPoint(event as TouchEvent | MouseEvent);
    isSwiping = true;
    totalX = 0;
    totalY = 0;
    lastPoint = startPoint;
    handlers.start && handlers.start(startPoint, event);
  };

  const moveHandler = (event: Event) => {
    if (!isSwiping || !startPoint) return;
    const currentPoint = getPoint(event as TouchEvent | MouseEvent);
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

  const endHandler = (event: Event) => {
    if (!isSwiping || !startPoint) return;
    isSwiping = false;
    const endPoint = getPoint(event as TouchEvent | MouseEvent);
    handlers.end && handlers.end(endPoint, event);
  };

  const cancelHandler = (event: Event) => {
    isSwiping = false;
    handlers.cancel && handlers.cancel(event);
  };

  element.addEventListener(getEventName(types, 'start'), startHandler);
  element.addEventListener(getEventName(types, 'move'), moveHandler);
  element.addEventListener(getEventName(types, 'end'), endHandler);
  if (getEventName(types, 'cancel')) {
    element.addEventListener(getEventName(types, 'cancel'), cancelHandler);
  }

  return () => {
    element.removeEventListener(getEventName(types, 'start'), startHandler);
    element.removeEventListener(getEventName(types, 'move'), moveHandler);
    element.removeEventListener(getEventName(types, 'end'), endHandler);
    if (getEventName(types, 'cancel')) {
      element.removeEventListener(getEventName(types, 'cancel'), cancelHandler);
    }
  };
};

export { bindSwipe, Point, SwipeHandlers };