// react/src/services/$swipe.ts

interface Point {
  x: number;
  y: number;
}

interface SwipeHandlers {
  start?: (point: Point, event: Event) => void;
  move?: (point: Point, event: Event) => void;
  end?: (point: Point, event: Event) => void;
  cancel?: (event: Event) => void;
}

const eventMap = {
  mouse: { start: "mousedown", move: "mousemove", end: "mouseup" },
  touch: { start: "touchstart", move: "touchmove", end: "touchend", cancel: "touchcancel" },
};

const getPoint = (event: any): Point => {
  const e = event.touches && event.touches.length ? event.touches[0] : event;
  return { x: e.clientX, y: e.clientY };
};

const getEvents = (types: string[], phase: string): string => {
  return types.map(type => eventMap[type][phase]).join(" ");
};

export const bindSwipe = (element: HTMLElement, handlers: SwipeHandlers, types: string[] = ["mouse", "touch"]) => {
  let startPoint: Point | null = null;
  let isSwiping = false;
  let deltaX = 0;
  let deltaY = 0;
  let lastPoint: Point | null = null;

  const startHandler = (event: Event) => {
    startPoint = getPoint(event);
    isSwiping = true;
    deltaX = 0;
    deltaY = 0;
    lastPoint = startPoint;
    handlers.start && handlers.start(startPoint, event);
  };

  const moveHandler = (event: Event) => {
    if (!isSwiping || !startPoint) return;
    const point = getPoint(event);
    deltaX += Math.abs(point.x - lastPoint!.x);
    deltaY += Math.abs(point.y - lastPoint!.y);
    lastPoint = point;
    if (deltaX > 10 || deltaY > 10) {
      if (deltaY > deltaX) {
        isSwiping = false;
        handlers.cancel && handlers.cancel(event);
      } else {
        event.preventDefault();
        handlers.move && handlers.move(point, event);
      }
    }
  };

  const endHandler = (event: Event) => {
    if (!isSwiping || !startPoint) return;
    isSwiping = false;
    const point = getPoint(event);
    handlers.end && handlers.end(point, event);
  };

  const cancelHandler = (event: Event) => {
    isSwiping = false;
    handlers.cancel && handlers.cancel(event);
  };

  element.addEventListener(getEvents(types, "start"), startHandler);
  element.addEventListener(getEvents(types, "move"), moveHandler);
  element.addEventListener(getEvents(types, "end"), endHandler);
  if (getEvents(types, "cancel")) {
    element.addEventListener(getEvents(types, "cancel"), cancelHandler);
  }

  return () => {
    element.removeEventListener(getEvents(types, "start"), startHandler);
    element.removeEventListener(getEvents(types, "move"), moveHandler);
    element.removeEventListener(getEvents(types, "end"), endHandler);
    if (getEvents(types, "cancel")) {
      element.removeEventListener(getEvents(types, "cancel"), cancelHandler);
    }
  };
};